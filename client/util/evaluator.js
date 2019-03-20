export default class Evaluator {
  constructor() {
    this.seenErrorMessages = new Set()
    this.seenErrors = []
  }

  getFunctionBody(code) {
    // =(?:\s)*(.*) captures what comes after an assignment
    return code.startsWith('function')
      ? code
      : code.slice(new RegExp('=(?:\\s)*(.*)').exec(code).index + 1)
  }

  sanitizeInputQuotes(input) {
    return input
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D\u201c\u201d]/g, '"')
  }

  getResult(code, inputArray) {
    code = this.getFunctionBody(code.trim())

    const outputs = inputArray.map(async (input, index) => {
      const output = await this.evaluate(code, this.sanitizeInputQuotes(input))
      const singleErrorForAllInputs =
        index === inputArray.length - 1 && this.seenErrorMessages.size === 1
      if (singleErrorForAllInputs) throw this.seenErrors[0]
      return output
    })

    this.seenErrorMessages.clear()
    this.seenErrors = []
    return Promise.all(outputs)
  }

  evaluate(fn, input) {
    return new Promise((resolve, reject) => {
      try {
        const code = `
        self.onmessage = () => {
          self.postMessage((${fn})(...[${input}]))
        }`

        const blob = new Blob([code], {type: 'text/javascript'})
        const blobUrl = window.URL.createObjectURL(blob)
        let worker = new Worker(blobUrl)
        window.URL.revokeObjectURL(blobUrl)

        worker.onmessage = result => {
          console.log('worker on message')
          resolve(result.data)
          worker.terminate()
        }

        worker.onerror = error => {
          this.seenErrorMessages.add(error.message)
          this.seenErrors.push(error)
          resolve(error.message)
          worker.terminate()
        }

        worker.postMessage('')
        setTimeout(function() {
          worker.terminate()
          worker = null
          resolve(
            'This is taking longer than expected! You may have written an infinite loop, or your code may require too many resources.'
          )
        }, 10000)
      } catch (error) {
        reject(error)
      }
    })
  }
}
