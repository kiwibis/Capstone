module.exports = function bracketBalancer(parsedJson) {
  let textString = ''
  parsedJson.forEach(word => {
    word.symbols.forEach(symbol => {
      textString += symbol.char
      if (symbol.endOfLine) {
        textString += '\n'
      }
    })
    textString += ' '
  })
  const openingBracket = '{'
  const closingBracket = '}'
  const matchingBrackets = {
    '}': '{',
    '{': '}'
  }
  const stack = []
  for (let i = 0; i < textString.length; i++) {
    if (openingBracket === textString[i]) {
      stack.push(textString[i])
    } else if (closingBracket === textString[i]) {
      if (stack[stack.length - 1] === matchingBrackets[textString[i]]) {
        stack.pop()
      } else if (stack.length === 0) {
        stack.push(openingBracket)
      }
    }
  }
  while (stack.length) {
    textString += matchingBrackets[stack[stack.length - 1]]
    stack.pop()
  }
  return textString
}
