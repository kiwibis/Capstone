function correctErrors(simplifiedArray) {
  //Characters that need to be checked regardless of GV confidence level
  const troubleChars = [')', '>', '+', '=', '-']

  const correctedArray = []

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
        const charObject = {...originalChar}
        console.log(charObject.character, charObject.confidence)
        if (isLowConfidence(charObject)) {
          checkWord = true
        }

        //If this is the first character of the word and the corrected array is not empty
        correctedArray.length &&
          wordIsCapitalizedAndPreviousWordIsWord(
            charObject,
            correctedArray,
            index
          ) &&
          (concatWord = true)
      })

      //If word needs to be checked:
      if (checkWord) {
        word = wordCorrector(word, correctedArray)
      }

      //Either concat word to previous word or push word onto corrected Array
      concatWord
        ? concatWordToPreviousWord(word, correctedArray)
        : correctedArray.push(word)
    } else {
      // "Word" has one character and is a character

      const correctedChar = {symbols: []}

      let charObject = {...word.symbols[0]}
      let char = charObject.character

      console.log('***CONFIDENCE***', char, charObject.confidence)

      //if low confidence or a trouble character, call corrector
      if (isLowConfidence(charObject) || troubleChars.includes(char)) {
        charObject = charCorrector(char, charObject, correctedArray)
      }

      //if the character still exists, push charObject on to symbols of the correctedChar
      char && correctedChar.symbols.push(charObject)

      //if the corrected Char has symbols, push to corrected Array
      correctedChar.symbols.length && correctedArray.push(correctedChar)
    }
  })

  return correctedArray
}

function wordCorrector(word, correctedArray) {
  return word
}

function charCorrector(char, charObject, correctedArray) {
  const previousCharObject =
    correctedArray[correctedArray.length - 1].symbols[0]

  if (char === ')') {
    console.log('***IN CHANGE PARENS***')
    if (previousCharObject.character === '=') {
      previousCharObject.character = previousCharObject.character.concat('>')
      char = ''
      charObject = {...charObject, character: char}
    }
  }
  if (char === '>') {
    console.log(
      '*** MAKE ARROW *** char:',
      char,
      'previous char',
      previousCharObject.character
    )
    if (previousCharObject.character === '=') {
      previousCharObject.character = previousCharObject.character.concat('>')
      char = ''
      charObject = {...charObject, character: char}
    }
  }
  if (['+', '-', '='].includes(char)) {
    console.log(correctedArray)
    if (correctedArray.length) {
      console.log(correctedArray.length)
      console.log(previousCharObject)
      if (['+', '-', '='].includes(previousCharObject.character)) {
        previousCharObject.character = previousCharObject.character.concat(char)
        char = ''
        charObject = {...charObject, character: char}
      }
    }
  }
  return charObject
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
      char.character[0] === char.character[0].toUpperCase() &&
      correctedArray[correctedArray.length - 1].symbols.length > 1
    ) {
      return true
    }
  }
  return false
}
const concatWordToPreviousWord = (word, correctedArray) => {
  correctedArray[correctedArray.length - 1].symbols = correctedArray[
    correctedArray.length - 1
  ].symbols.concat(word.symbols)
}

module.exports = correctErrors
