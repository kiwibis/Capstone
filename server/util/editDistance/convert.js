// The convertWordObjectToString function takes a word object that has an array of 'symbols', each of which is represented by an object with 'character' and 'confidence' keys. It returns that word as a string.
function convertWordObjectToString(wordObject) {
  const wordAsString = wordObject.symbols.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.character
    },
    ''
  )
  return wordAsString
}

// The convertStringToWordObject function takes string and returns a word object that has an array of 'symbols', each of which is represented by an object with one 'character' key
function convertStringToWordObject(string) {
  const symbols = []
  for (let i = 0; i < string.length; i++) {
    symbols.push({character: string[i]})
  }
  return {symbols}
}

module.exports = {convertStringToWordObject, convertWordObjectToString}
