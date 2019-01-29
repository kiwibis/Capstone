// The languageCheck function checks to see which languages are
// detected by the Google Vision API.
// If any languages other than English or Latin are detected,
// setting languageCheckNeeded to true indicates that the
// detected languages must also be checked for each character.
// It then calls the simplifyVisionResponse function.

module.exports = function languageCheck(visionAPIResponse) {
  const page = visionAPIResponse.fullTextAnnotation.pages[0]
  let languageCheckNeeded = false
  page.property.detectedLanguages.forEach(language => {
    if (language.languageCode !== 'en' && language.languageCode !== 'la') {
      languageCheckNeeded = true
    }
  })
  return simplifyVisionResponse(visionAPIResponse, languageCheckNeeded)
}

// The simplifyVisionResponse function takes the JSON response from Google's Vision API
// Document/Handwriting Text Detector, and creates an array of the
// detected words, where each word is represented by an array of symbol objects,
// each of which contains the detected character, the OCR's confidence, and whether
// or not the character is the last in its line.
// If languageCheckNeeded is true, and a character's detectedLanguage is
// a language other than English, that character's confidence is set to 0

function simplifyVisionResponse(visionAPIResponse, languageCheckNeeded) {
  const wordsArray = []
  const page = visionAPIResponse.fullTextAnnotation.pages[0]
  page.blocks.forEach(block => {
    block.paragraphs.forEach(para => {
      para.words.forEach(word => {
        const wordObject = {symbols: []}
        word.symbols.forEach(symbol => {
          const symbolObject = {
            character: symbol.text,
            confidence: symbol.confidence,
            isEndOfLine: false
          }
          const {detectedBreak} = symbol.property
          if (detectedBreak) {
            if (
              detectedBreak.type === 'EOL_SURE_SPACE' ||
              detectedBreak.type === 'LINE_BREAK'
            ) {
              symbolObject.isEndOfLine = true
            }
          }
          if (languageCheckNeeded) {
            symbol.property.detectedLanguages.forEach(lang => {
              if (lang !== 'en' && lang !== 'la') {
                symbolObject.confidence = 0
              }
            })
          }
          wordObject.symbols.push(symbolObject)
        })
        wordsArray.push(wordObject)
      })
    })
  })

  return wordsArray
}
