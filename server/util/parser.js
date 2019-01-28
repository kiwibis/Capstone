export default function parser(json) {
  const resultArray = []
  json.fullTextAnnotation.pages[0].property.blocks.forEach(block => {
    block.paragraphs.forEach(para => {
      para.words.forEach(word => {
        const wordObj = {symbols: []}
        word.symbols.forEach(symbol => {
          const symbolObj = {
            char: symbol.text,
            confidence: symbol.confidence
          }
          word.symbols.push(symbolObj)
        })
        resultArray.push(wordObj)
      })
    })
  })

  return resultArray
}
