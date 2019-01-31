const chai = require('chai')
const expect = chai.expect
const editDistance = require('../editDistance/editDistance')

describe('Edit Distance', () => {
  it('returns the edit distance between 2 strings', () => {
    let source = 'gumbo'
    let target = 'gambol'
    expect(editDistance(source, target)).to.equal(2)
    source = 'kitten'
    target = 'sitting'
    expect(editDistance(source, target)).to.equal(3)
    source = 'honda'
    target = 'hyundai'
    expect(editDistance(source, target)).to.equal(3)
    source = 'gily'
    target = 'geely'
    expect(editDistance(source, target)).to.equal(2)
    source = 'geek'
    target = 'gesek'
    expect(editDistance(source, target)).to.equal(1)
    source = 'sunday'
    target = 'saturday'
    expect(editDistance(source, target)).to.equal(3)
    source = 'intention'
    target = 'execution'
    expect(editDistance(source, target)).to.equal(5)
    source = 'hey, my name is jen'
    target = 'hey, my name is jen'
    expect(editDistance(source, target)).to.equal(0)
  })
})
