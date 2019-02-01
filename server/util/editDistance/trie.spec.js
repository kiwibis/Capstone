const chai = require('chai')
const expect = chai.expect
const Trie = require('./trie')

describe('Trie', function() {
  let trie
  beforeEach(function() {
    trie = new Trie()
  })

  describe('the head of a trie is initialized with the correct values', function() {
    it('has the correct data', function() {
      expect(trie.data).to.equal('')
    })
    it('has the correct size', function() {
      expect(trie.size).to.equal(0)
    })
    it('has the right amount of children', function() {
      expect(Object.keys(trie.children)).to.have.lengthOf(0)
    })
  })

  describe('inserts strings', function() {
    beforeEach(function() {
      trie.insert('hi')
    })
    it('updates the size at the head', function() {
      expect(trie.size).to.equal(1)
    })
    it('the last character inserted is made a terminal node', function() {
      expect(trie.children.h.children.i.isTerminal).to.equal(true)
    })
    describe('inserts another string with an existing prefix in the trie, correctly', function() {
      beforeEach(function() {
        trie.insert('hint')
        trie.insert('hinder')
      })
      it('updates the size at the prefixes', function() {
        expect(trie.children.h.size).to.equal(3)
        expect(trie.children.h.children.i.size).to.equal(2)

        expect(trie.children.h.children.i.children.n.size).to.equal(2)
      })
      it('the last character is made a terminal node', function() {
        expect(
          trie.children.h.children.i.children.n.children.t.isTerminal
        ).to.equal(true)
      })
    })
  })

  describe('searches for words with a certain prefix', function() {
    beforeEach(function() {
      trie.insert('hi')
      trie.insert('hint')
      trie.insert('hinder')
    })
  })
})
