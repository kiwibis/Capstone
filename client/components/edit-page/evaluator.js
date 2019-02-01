export default class Evaluator {
  getArgs(input) {
    // will split the string using ',' when not surrounded by quotations,
    // or brackets [], (), {}

    // (?=.*(?:["']).*)
    // comma followed by quotation marks, but don't include (?:) those marks

    // (?![^\{\(\[]*[\]\)\}])
    // comma not followed by a closing brace ], ), } ie {bye: 4, sir: 2}
    return input.trim().split(/,(?=.*(?:["']).*)(?![^{([]*[\])}])/g)
  }

  getResult(code, inputArray) {
    if (code.startsWith('function')) {
      return inputArray.map(input => {
        const codeString = `(${code})(...[${this.getArgs(input)}])`
        // console.log(...[this.getArgs(input)])
        // console.log(eval(codeString))
        return eval(codeString)
      })
    } else {
      const arrowIndex = code.indexOf('=>')
      const firstHalf = code.slice(0, arrowIndex)
      const constIndex = firstHalf.lastIndexOf('const')
      const noConstSlice = firstHalf.slice(constIndex + 5)
      const endOfWordIndex = noConstSlice.lastIndexOf('=')
      const endOfWord = noConstSlice.slice(0, endOfWordIndex)
      return inputArray.map(input => {
        const funcCall = endOfWord + '(...[' + this.getArgs(input) + '])'
        const codeString = code + '\n' + funcCall
        return eval(codeString)
      })
    }
  }
}
