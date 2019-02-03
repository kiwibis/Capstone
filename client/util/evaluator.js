export default class Evaluator {
  getFunctionBody(code) {
    // =(?:\s)*(.*) returns the function definition of the function expression
    return code.startsWith('function')
      ? code
      : code.match(new RegExp('=(?:\\s)*(.*)'))[1]
  }

  getResult(code, inputArray) {
    code = this.getFunctionBody(code.trim())
    return inputArray.map(input => {
      return this.evaluate(code, input)
    })
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
          reject(error)
          worker.terminate()
        }

        worker.postMessage('run')
      } catch (error) {
        reject(error)
      }
    })
  }
}
