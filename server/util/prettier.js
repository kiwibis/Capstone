const prettier = require('prettier')
const bracketBalancer = require('./bracketBalancer')

module.exports = function prettify(textArray) {
  const textString = bracketBalancer(textArray)
  try {
    return prettier.format(textString)
  } catch (err) {
    return textString
  }
}
