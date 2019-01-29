const chai = require('chai')
const expect = chai.expect
const exampleSimplifiedArray = require('./exampleSimplifiedArray')
const balanceBrackets = require('../balanceBrackets')

describe('Balance Brackets', () => {
  let textString
  beforeEach(() => {
    textString = balanceBrackets(exampleSimplifiedArray)
  })

  it('creates a string from the simplified object', () => {
    expect(typeof textString).to.equal('string')
  })
  it('adds missing brackets at the end of the string', () => {
    expect(textString).to.equal('hi\n {\n guys !\n }')
  })
})
