function correctErrors(simplifiedArray) {
  const correctedArray = []
  simplifiedArray.forEach(originalWord => {
    const word = {...originalWord}
    if (word.symbols.length > 1) {
      let checkWord = false
      let concatWord = false
      word.symbols.forEach(originalChar => {
        const char = {...originalChar}
        if (char.confidence < 0.6) {
          checkWord = true
        }
        if (correctedArray.length) {
          if (
            char.character[0] === char.character.toUpperCase() &&
            correctedArray[correctedArray.length - 1].symbols.length > 1
          ) {
            concatWord = true
          }
        }
      })
      if (checkWord) {
        const correctedWord = wordCorrector(word)
        if (concatWord) {
          correctedArray[correctedArray.length - 1].symbols = correctedArray[
            correctedArray.length - 1
          ].symbols.concat(correctedWord.symbols)
        } else {
          correctedArray.push(correctedWord)
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (concatWord) {
          correctedArray[correctedArray.length - 1].symbols = correctedArray[
            correctedArray.length - 1
          ].symbols.concat(word.symbols)
        } else {
          correctedArray.push(word)
        }
      }
    } else {
      const correctedChar = {symbols: []}
      word.symbols.forEach(originalChar => {
        const char = {...originalChar}
        if (char.confidence < 0.6) {
          const newChar = charCorrector(char)
          correctedChar.symbols.push(newChar)
        } else {
          correctedChar.symbols.push(char)
        }
      })
      correctedArray.push(correctedChar)
    }
  })
  console.log(correctedArray)
  return correctedArray
}

function wordCorrector(word) {
  return word
}

function charCorrector(char) {
  return char
}

module.exports = correctErrors
