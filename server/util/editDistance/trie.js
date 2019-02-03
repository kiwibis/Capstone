class Trie {
  constructor(character = '') {
    this.letter = character
    this.children = {}
    this.size = 0
    this.word = null
  }

  insert(word) {
    let node = this
    for (let i = 0; i < word.length; ++i) {
      const newNode = node.children[word[i]] || new Trie(word[i])
      node.children[word[i]] = newNode
      node.size++

      node = newNode
    }
    node.word = word
  }

  search(word, maxDistance) {
    const initialRow = [...Array(word.length + 1).keys()]
    const candidates = []
    for (const letter of Object.keys(this.children)) {
      this.searchHelper(
        this.children[letter],
        word,
        initialRow,
        maxDistance,
        candidates
      )
    }
    // candidates are of the form [word, distance]
    // we want the results in descending order in terms of distance
    candidates.sort((a, b) => a[1] - b[1])
    return candidates
  }

  searchHelper(node, word, previousRow, maxDistance, candidates) {
    /** build a row for the current letter (node.letter) in the trie, where
     * we're comparing it against the letters in the word. In the first index,
     * we're comparing the letter to an empty string
     */
    const currentRow = [previousRow[0] + 1],
      columns = previousRow.length
    for (let column = 1; column < columns; ++column) {
      const insertCost = currentRow[column - 1] + 1
      const deleteCost = previousRow[column] + 1
      const swapCost =
        node.letter === word[column - 1]
          ? previousRow[column - 1]
          : previousRow[column - 1] + 1

      currentRow.push(Math.min(...[insertCost, deleteCost, swapCost]))
    }

    // if the last entry in the row indicates the optimal cost is less than the
    // maximum cost, and there is a word in this trie node, then add it.
    if (currentRow[columns - 1] <= maxDistance && node.word) {
      candidates.push([node.word, currentRow[columns - 1]])
    }

    // if any entries in the row are less than the maximum cost, then
    // recursively search each brMath.anch of the trie
    if (Math.min(...currentRow) <= maxDistance) {
      for (const letter of Object.keys(node.children)) {
        this.searchHelper(
          node.children[letter],
          word,
          currentRow,
          maxDistance,
          candidates
        )
      }
    }
  }
}

module.exports = Trie
