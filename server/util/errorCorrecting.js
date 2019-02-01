function correctErrors(simplifiedArray) {
  const troubleChars = [')', '>', '+', '=', '-']
  const correctedArray = []

  //Characters that need to be checked regardless of GV confidence level
  const troubleChars = [')', '>']

  simplifiedArray.forEach(originalWord => {
    console.log('*** NEW WORD ***')
    //copy word object
    let word = {...originalWord}

    //if word object is a word (multiple characters)
    if (isWord(word)) {
      //Indicates whether the word should be passed to the word corrector function
      let checkWord = false

      //Indicates whether the word should be concatenated to the previous word
      let concatWord = false

      //For each determines if any characters are low confidence and if word should be concatenated
      word.symbols.forEach((originalChar, index) => {
        //copy character object
        const char = {...originalChar}

        if (isLowConfidence(char)) {
          checkWord = true
        }

        //If this is the first character of the word and the corrected array is not empty
        correctedArray.length &&
          wordIsCapitalizedAndPreviousWordIsWord(char, correctedArray, index) &&
          (concatWord = true)
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

//Smaller utils
const isWord = word => word.symbols.length > 1
const isLowConfidence = char => char.confidence < 0.7
const wordIsCapitalizedAndPreviousWordIsWord = (
  char,
  correctedArray,
  index
) => {
  if (index === 0) {
    if (
      char.character[0] === char.character.toUpperCase() &&
      correctedArray[correctedArray.length - 1].symbols.length > 1
    ) {
      return true
    }
  }
  return false
}

module.exports = correctErrors
