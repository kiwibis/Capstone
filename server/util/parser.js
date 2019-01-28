module.exports = function languageCheck(json) {
  const page = json.fullTextAnnotation.pages[0]
  let languageChecker
  page.property.detectedLanguages.forEach(lang => {
    if (lang.languageCode !== 'en' && lang.languageCode !== 'la') {
      languageChecker = true
    }
  })
  return parser(json, languageChecker)
}

function parser(json, checker) {
  const resultArray = []
  const page = json.fullTextAnnotation.pages[0]
  page.blocks.forEach(block => {
    block.paragraphs.forEach(para => {
      para.words.forEach(word => {
        const wordObj = {symbols: []}
        word.symbols.forEach(symbol => {
          const symbolObj = {
            char: symbol.text,
            confidence: symbol.confidence,
            endOfLine: false
          }
          const {detectedBreak} = symbol.property
          if (detectedBreak) {
            if (
              detectedBreak.type === 'EOL_SURE_SPACE' ||
              detectedBreak.type === 'LINE_BREAK'
            ) {
              symbolObj.endOfLine = true
            }
          }
          if (checker) {
            symbol.property.detectedLanguages.forEach(lang => {
              if (lang !== 'en' && lang !== 'la') {
                symbolObj.confidence = 0
              }
            })
          }
          wordObj.symbols.push(symbolObj)
        })
        resultArray.push(wordObj)
      })
    })
  })

  return resultArray
}
