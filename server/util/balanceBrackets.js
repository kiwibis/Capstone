// The balanceBrackets function takes an array of words checks to see whether
// or not it contains unbalanced curly brackets.
// If the brackets are unbalanced, it inserts the necessary curly brackets.

function balanceBrackets(wordsArray) {
  let textString = ''
  wordsArray.forEach(word => {
    word.symbols.forEach(symbol => {
      textString += symbol.character
      if (symbol.isEndOfLine) {
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
      if (stack[stack.length - 1] === openingBracket) {
        stack.pop()
      } else {
        textString = textString.slice(0, i) + '{' + textString.slice(i + 1)
        stack.push('{')
      }
    }
  }
  while (stack.length) {
    textString += matchingBrackets[stack[stack.length - 1]]
    stack.pop()
  }
  return textString
}

module.exports = balanceBrackets
