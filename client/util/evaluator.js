export default class Evaluator {
  constructor() {
    this.seenErrors = new Set()
  }

  getFunctionBody(code) {
    // =(?:\s)*(.*) captures what comes after an assignment
    return code.startsWith('function')
      ? code
      : code.slice(new RegExp('=(?:\\s)*(.*)').exec(code).index + 1)
  }

  getResult(code, inputArray) {
    code = this.getFunctionBody(code.trim())

    const outputs = inputArray.map((input, index) => {
      const output = this.evaluate(code, input)
      const singleErrorForAllInputs =
        index === inputArray.length - 1 && this.seenErrors.size === 1
      if (singleErrorForAllInputs)
        throw new Error(Array.from(this.seenErrors)[0])
      return output
    })

    this.seenErrors.clear()
    return outputs
  }

  evaluate(fn, input) {
    return new Promise((resolve, reject) => {
      try {
        const code = `
        const console = {
          log: function() {
            let str = arguments.map(arg => JSON.stringify(arg)).join(' ')

            // send the message back to the main thread
            self.postMessage(str + '\\n')
          }
        }
        self.onmessage = () => {
          self.postMessage((${fn})(...[${input}]))
        }`

        const blob = new Blob([code], {type: 'text/javascript'})
        const blobUrl = window.URL.createObjectURL(blob)
        const worker = new Worker(blobUrl)
        window.URL.revokeObjectURL(blobUrl)

        worker.onmessage = result => {
          resolve(result.data)
          worker.terminate()
        }

        worker.onerror = error => {
          this.seenErrors.add(error.message)
          resolve(error.message)
          worker.terminate()
        }

        worker.postMessage('')
      } catch (error) {
        reject(error)
      }
    })
  }
}
