const {replace} = require('./editDistance/editDistance')
const {
  convertStringToWordObject,
  convertWordObjectToString
} = require('./editDistance/convert')

function correctErrors(simplifiedArray) {
  //Characters that need to be checked regardless of google vision confidence level
  const troubleChars = [')', '>', '+', '=', '-']

  const correctedArray = []

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
            const {returnedWord, replaced, distance} = replace(
              previousWordAsString
            )
            if (replaced && distance === 0) {
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

  checkQuotationMarks(correctedArray)
  return correctedArray
}

function wordCorrector(originalWordObject, correctedArray) {
  const wordAsString = convertWordObjectToString(originalWordObject)
  // compare low-confidence words to all words in JS dictionary
  const jsResponse = replace(wordAsString)
  const closeToJSWord = jsResponse.replaced
  let closestJSWord
  let distanceFromJSWord
  if (closeToJSWord) {
    closestJSWord = jsResponse.returnedWord
    distanceFromJSWord = jsResponse.distance
    if (distanceFromJSWord === 0) {
      return originalWordObject
    }
  }
  // compare low-confidence words to all words already seen
  const seenWordsResponse = replace(
    wordAsString,
    correctedArray.map(wordObject => convertWordObjectToString(wordObject))
  )
  const closeToSeenWord = seenWordsResponse.replaced
  let closestSeenWord
  let distanceFromSeenWord
  if (closeToSeenWord) {
    closestSeenWord = seenWordsResponse.returnedWord
    distanceFromSeenWord = seenWordsResponse.distance
    if (distanceFromSeenWord === 0) {
      return originalWordObject
    }
  }
  if (!closeToJSWord && !closeToSeenWord) {
    return originalWordObject
  } else {
    const wordToReplaceOriginal = closestJSWord || closestSeenWord
    return convertStringToWordObject(wordToReplaceOriginal)
  }
}

function checkQuotationMarks(correctedArray) {
  let singleQuotes = []
  let doubleQuotes = []

  //tracks the location of each quotation mark in code
  correctedArray.forEach((word, wordIndex) => {
    word.symbols.forEach((char, charIndex) => {
      char.character === "'" && singleQuotes.push({wordIndex, charIndex})
      char.character === '"' && doubleQuotes.push({wordIndex, charIndex})
    })
  })

  //if there are only two total quotation marks, changes both to be double quotation marks
  if (singleQuotes.length + doubleQuotes.length === 2) {
    singleQuotes.forEach(quote => {
      correctedArray[quote.wordIndex].symbols[quote.charIndex].character = '"'
    })
    const bothQuotes = singleQuotes.concat(doubleQuotes)
    let firstIndex
    let secondIndex
    if (bothQuotes[0].wordIndex < bothQuotes[1].wordIndex) {
      firstIndex = 0
      secondIndex = 1
    } else {
      firstIndex = 1
      secondIndex = 0
    }

    correctedArray[bothQuotes[firstIndex].wordIndex + 1].symbols.unshift({
      character: '"',
      confidence: 1
    })

    correctedArray[bothQuotes[secondIndex].wordIndex - 1].symbols.push({
      character: '"',
      confidence: 1
    })

    correctedArray.splice([bothQuotes[firstIndex].wordIndex], 1)
    correctedArray.splice([bothQuotes[secondIndex].wordIndex - 1], 1)
  }
}

function charCorrector(char, charObject, correctedArray) {
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
        previousCharObject.character = previousCharObject.character.concat(char)
        char = ''
        charObject = {...charObject, character: char}
      }
    }
  }
  if (char === 'Ş') {
    charObject.character = '{'
  }
  return charObject
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
