class Trie {
  constructor(character = '', size = 0) {
    this.data = character
    this.children = {}
    this.size = size
    this.isTerminal = false
  }

  insert(word) {
    let node = this
    for (let i = 0; i < word.length; ++i) {
      const newNode = node.children[word[i]] || new Trie(word[i], 1)
      node.children[word[i]] = newNode
      node.size++

      node = newNode
    }
    node.isTerminal = true
  }

  search(prefix) {}
}

module.exports = Trie
