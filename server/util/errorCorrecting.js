function correctErrors(simplifiedArray) {
  const troubleChars = [')', '>', '+', '=', '-']
  const correctedArray = []
  simplifiedArray.forEach(originalWord => {
    console.log('*** NEW WORD ***')
    let word = {...originalWord}
    if (word.symbols.length > 1) {
      let checkWord = false
      let concatWord = false
      word.symbols.forEach(originalChar => {
        const char = {...originalChar}
        if (char.confidence < 0.7) {
          checkWord = true
        }
        if (correctedArray.length) {
          console.log(
            '***UPPERCASE?***',
            char,
            char.character[0] === char.character.toUpperCase()
          )
          if (
            char.character[0] === char.character.toUpperCase() &&
            correctedArray[correctedArray.length - 1].symbols.length > 1
          ) {
            concatWord = true
          }
        }
      })
      if (checkWord) {
        const correctedWord = wordCorrector(word, correctedArray)
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
          console.log('***IN CONCAT WORD***')
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
        let char = {...originalChar}
        console.log('***CONFIDENCE***', char.character, char.confidence)
        if (char.confidence < 0.7 || troubleChars.includes(char.character)) {
          const newChar = charCorrector(char, correctedArray)
          if (newChar.character !== '') {
            correctedChar.symbols.push(newChar)
          }
        } else {
          correctedChar.symbols.push(char)
        }
      })

      correctedArray.push(correctedChar)
    }
  })
  return correctedArray
}

function wordCorrector(word, correctedArray) {
  return word
}

function charCorrector(char, correctedArray) {
  if (char.character === ')') {
    console.log('***IN CHANGE PARENS***')
    if (
      correctedArray[correctedArray.length - 1].symbols[0].character === '='
    ) {
      correctedArray[
        correctedArray.length - 1
      ].symbols[0].character = correctedArray[
        correctedArray.length - 1
      ].symbols[0].character.concat('>')
      char.character = ''
    }
  }
  if (char.character === '>') {
    if (
      correctedArray[correctedArray.length - 1].symbols[0].character === '='
    ) {
      correctedArray[
        correctedArray.length - 1
      ].symbols[0].character = correctedArray[
        correctedArray.length - 1
      ].symbols[0].character.concat('>')
      char.character = ''
    }
  }
  if (['+', '-', '='].includes(char.character)) {
    if (
      correctedArray.length &&
      ['+', '-', '='].includes(
        correctedArray[correctedArray.length - 1].symbols[0].character
      )
    ) {
      correctedArray[
        correctedArray.length - 1
      ].symbols[0].character = correctedArray[
        correctedArray.length - 1
      ].symbols[0].character.concat(char.character)
      char.character = ''
    }
  }

  return char
}

module.exports = correctErrors
