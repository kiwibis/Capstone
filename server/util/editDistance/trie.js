class Trie {
  constructor(character = '') {
    this.data = character
    this.children = {}
    this.size = 0
    this.isTerminal = false
  }

  insert(word) {
    let node = this
    for (let i = 0; i < word.length; ++i) {
      const newNode = node.children[word[i]] || new Trie(word[i])
      node.children[word[i]] = newNode
      node.size++

      node = newNode
    }
    node.isTerminal = true
  }

  search(prefix) {}
}

module.exports = Trie
