const chai = require('chai')
const expect = chai.expect
const simplifyVisionResponse = require('../simplifyVisionResponse')
const exampleResponse = require('./exampleVisionAPIOutput.json')

const exampleResponseLanguageCheck = require('./exampleVisionAPIOutputWithLanguageCheck.json')

describe('Simplify Vision Response', () => {
  let simplifiedArray

  it('returns an object that simplifies the Google Vision JSON response', () => {
    simplifiedArray = simplifyVisionResponse(exampleResponse)
    expect(simplifiedArray[0].symbols[0].character).to.equal('c')
    expect(simplifiedArray.length).to.equal(33)
  })

  it('changes the confidence of a character marked with a language code other than "en" and "la"', () => {
    simplifiedArray = simplifyVisionResponse(exampleResponseLanguageCheck)
    expect(simplifiedArray[7].symbols[0].confidence).to.equal(0)
    expect(simplifiedArray[0].symbols[0].confidence).to.equal(0.98)
  })
})
