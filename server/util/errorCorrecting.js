const {replace} = require('./editDistance/editDistance')
const {
  convertStringToWordObject,
  convertWordObjectToString
} = require('./editDistance/convert')

function correctErrors(simplifiedArray) {
  //Characters that need to be checked regardless of google vision confidence level
  const troubleChars = [')', '>', '+', '=', '-']

  let correctedArray = []

  simplifiedArray.forEach(originalWord => {
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
        if (
          correctedArray.length &&
          wordIsCapitalizedAndPreviousWordIsWord(
            charObject,
            correctedArray,
            index
          )
        ) {
          let previousWordIsJSWord = false
          if (correctedArray.length) {
            const previousWord = correctedArray[correctedArray.length - 1]
            const previousWordAsString = convertWordObjectToString(previousWord)
            const {returnedWord, replaced} = replace(previousWordAsString)
            if (replaced) {
              previousWordIsJSWord = true
            }
          }
          if (!previousWordIsJSWord) {
            concatWord = true
          }
        }
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
      // "Word" has one character meaning it is a character

      const correctedChar = {symbols: []}

      let charObject = {...word.symbols[0]}
      let char = charObject.character

      console.log(char, charObject.confidence)

      //if low confidence or a trouble character, call corrector
      if (isLowConfidence(charObject) || troubleChars.includes(char)) {
        charObject = charCorrector(char, charObject, correctedArray)
      }

      //if the character still exists, push charObject on to symbols of the correctedChar

      charObject.character && correctedChar.symbols.push(charObject)

      //if the corrected Char has symbols, push to corrected Array
      correctedChar.symbols.length && correctedArray.push(correctedChar)
    }
  })

  correctedArray = checkQuotationMarks(correctedArray)
  return finalCheck(correctedArray)
}

function wordCorrector(wordObject, correctedArray) {
  const wordAsString = convertWordObjectToString(wordObject)
  const {returnedWord, replaced} = replace(wordAsString)
  if (returnedWord === wordAsString) {
    return wordObject
  } else {
    return convertStringToWordObject(returnedWord)
  }
}

function checkQuotationMarks(correctedArray) {
  console.log('*** Checking quote ***')
  const correctedArrayCopy = [...correctedArray]
  let singleQuotes = []
  let doubleQuotes = []

  //tracks the location of each quotation mark in code
  correctedArrayCopy.forEach((word, wordIndex) => {
    word.symbols.forEach((char, charIndex) => {
      char.character === "'" && singleQuotes.push({wordIndex, charIndex})
      char.character === '"' && doubleQuotes.push({wordIndex, charIndex})
    })
  })

  if (singleQuotes.length + doubleQuotes.length === 2 && singleQuotes.length) {
    correctedArrayCopy[singleQuotes[0].wordIndex].symbols[
      singleQuotes[0].charIndex
    ].character = '"'

    doubleQuotes.push(singleQuotes[0])

    if (singleQuotes[1]) {
      correctedArrayCopy[singleQuotes[1].wordIndex].symbols[
        singleQuotes[1].charIndex
      ].character = '"'

      doubleQuotes.push(singleQuotes[1])
    }
  }

  if (!(singleQuotes % 2)) {
    concatQuotes(singleQuotes, correctedArrayCopy)
  }

  if (!(doubleQuotes % 2)) {
    concatQuotes(doubleQuotes, correctedArrayCopy)
  }

  if (!(singleQuotes % 2) && !(doubleQuotes % 2)) {
    spliceQuotes(singleQuotes, doubleQuotes, correctedArrayCopy)
  } else if (!(singleQuotes % 2) && doubleQuotes % 2) {
    spliceQuotes(singleQuotes, 0, correctedArrayCopy)
  } else if (singleQuotes % 2 && !(doubleQuotes % 2)) {
    spliceQuotes(0, doubleQuotes, correctedArrayCopy)
  }

  return correctedArrayCopy
}

function concatQuotes(quoteArray, correctedArrayCopy) {
  console.log('*** Concat quotes ***')
  if (quoteArray.length) {
    let concatForward = true
    quoteArray.forEach(quote => {
      if (concatForward) {
        if (correctedArrayCopy[quote.wordIndex + 1]) {
          correctedArrayCopy[quote.wordIndex + 1].symbols.unshift({
            character: `${
              correctedArrayCopy[quote.wordIndex].symbols[0].character
            }`,
            confidence: 1
          })
        }
      } else {
        correctedArrayCopy[quote.wordIndex - 1].symbols.push({
          character: `${
            correctedArrayCopy[quote.wordIndex].symbols[0].character
          }`,
          confidence: 1
        })
      }
      concatForward = !concatForward
    })
  }
}

function spliceQuotes(singleQuotes, doubleQuotes, correctedArrayCopy) {
  console.log('*** splice quotes ***')
  let indexAdjustment = 0
  let allQuotes

  if (singleQuotes && doubleQuotes) {
    allQuotes = [...singleQuotes, ...doubleQuotes]
  } else if (singleQuotes) {
    allQuotes = [...singleQuotes]
  } else if (doubleQuotes) {
    allQuotes = [...doubleQuotes]
  }

  if (allQuotes.length) {
    allQuotes.sort((a, b) => {
      const keyA = a.wordIndex
      const keyB = b.wordIndex
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })

    allQuotes.forEach(quote => {
      correctedArrayCopy.splice([quote.wordIndex - indexAdjustment], 1)
      indexAdjustment += 1
    })
  }
}

function charCorrector(char, charObject, correctedArray) {
  if (correctedArray[correctedArray.length - 1]) {
    const previousCharObject =
      correctedArray[correctedArray.length - 1].symbols[0]

    if (char === ')') {
      if (previousCharObject.character === '=') {
        previousCharObject.character = previousCharObject.character.concat('>')
        char = ''
        charObject = {...charObject, character: char}
      }
    }
    if (char === '>') {
      if (previousCharObject.character === '=') {
        previousCharObject.character = previousCharObject.character.concat('>')
        char = ''
        charObject = {...charObject, character: char}
      }
    }
    if (['+', '-', '='].includes(char)) {
      if (correctedArray.length) {
        if (['+', '-', '=', '=='].includes(previousCharObject.character)) {
          previousCharObject.character = previousCharObject.character.concat(
            char
          )
          char = ''
          charObject = {...charObject, character: char}
        }
      }
    }
    if (char === 'Ş') {
      charObject.character = '{'
    }
  }
  return charObject
}

// The final check tries to ensure that argument and variable names are used consistently throughout the code
const finalCheck = correctedArray => {
  return correctedArray.map((word, index) => {
    // Calculate edit distance between word and all previous words; replace with previous word if distance is less than 2
    if (index > 0 && word.symbols.length > 1) {
      const wordAsString = convertWordObjectToString(word)
      const previousWordsAsStrings = correctedArray
        .slice(0, index)
        .map(wordObject => convertWordObjectToString(wordObject))
      const {returnedWord, replaced} = replace(
        wordAsString,
        previousWordsAsStrings
      )
      if (replaced) {
        return convertStringToWordObject(returnedWord)
      }
    }
    return word
  })
}

//Smaller utils
const isWord = word =>
  word.symbols.length > 1 ||
  'ABCDEFGHIJKLMNOPQRSTUVWXWZabcdefghijklmnopqrstuvwxyz'.includes(
    word.symbols[0].character
  )

const isLowConfidence = char => char.confidence < 0.7

const wordIsCapitalizedAndPreviousWordIsWord = (
  char,
  correctedArray,
  index
) => {
  if (index === 0) {
    if (
      char.character[0] === char.character[0].toUpperCase() &&
      isWord(correctedArray[correctedArray.length - 1])
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
