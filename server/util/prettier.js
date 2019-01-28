const prettier = require('prettier')

module.exports = function prettify(textArray) {
  let textString = ''
  textArray.forEach(word => {
    word.symbols.forEach(symbol => {
      textString += symbol.char
    })
    textString += ' '
  })
  try {
    return prettier.format('function hey() {const hey = "hey"; return hey}')
    // return prettier.format(textString)
  } catch (err) {
    return textString
    //this will give us the attempted prettier formatting (even with error detected)
  }
}
// module.exports = function prettify(string) {
//   try {
//     return prettier.format(string)
//   } catch (err) {
//     console.log('Error: ', err.toString())
//     //this will give us the attempted prettier formatting (even with error detected)
//   }
// }
