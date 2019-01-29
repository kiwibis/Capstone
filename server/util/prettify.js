const prettier = require('prettier')
const balanceBrackets = require('./balanceBrackets')

// The prettify function takes an array of words and passes it to balanceBrackets,
// which ensures that the curly brackets are balanced and returns a single string.
// It then passes the joined string to the prettier array for formatting.
// If prettier throws an error we return the unformatted string.

module.exports = function prettify(wordsArray) {
  const textString = balanceBrackets(wordsArray)
  try {
    return prettier.format(textString)
  } catch (err) {
    return textString
  }
}
