const chai = require('chai')
const expect = chai.expect
const Trie = require('../editDistance/trie')

describe('Trie', function() {
  let trie
  beforeEach(function() {
    trie = new Trie()
  })

  describe('the head of a trie is initialized with the correct values', function() {
    it('has the correct data/letter', function() {
      expect(trie.letter).to.equal('')
    })
    it("there's no word", function() {
      expect(trie.word).to.equal(null)
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
    it('the last character inserted is made a terminal node and stores the word', function() {
      expect(trie.children.h.children.i.word).to.equal('hi')
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
      it('the last character inserted is made a terminal node and stores the word', function() {
        expect(trie.children.h.children.i.children.n.children.t.word).to.equal(
          'hint'
        )
        expect(
          trie.children.h.children.i.children.n.children.d.children.e.children.r
            .word
        ).to.equal('hinder')
      })
    })
  })

  describe('search returns words within input distance of the input word', function() {
    beforeEach(function() {
      trie.insert('goober')
      trie.insert('goobers')
      trie.insert('gooier')
      trie.insert('intention')
      trie.insert('trials')
    })
    it('returns the results in ascending order of the distance from the input word', function() {
      expect(trie.search('goober', 1)).to.deep.equal([
        ['goober', 0],
        ['goobers', 1],
        ['gooier', 1]
      ])
      expect(trie.search('execution', 5)).to.deep.equal([['intention', 5]])
      expect(trie.search('zeil', 4)).to.deep.equal([['trials', 4]])
      expect(trie.search('zeil', 2)).to.deep.equal([])
      trie.insert('man')
      trie.insert('mad')
      expect(trie.search('moon', 3)).to.deep.equal([['man', 2], ['mad', 3]])
    })
  })
})
