const jsDictionary = require('./jsDictionary.json')
const {objects, functions, misc} = jsDictionary

// The editDistance function uses dynamic programming to return the minimum number of operations (insertions, deletions, swaps) needed to transform the source string into the target
function editDistance(source, target) {
  const lengthSource = source.length
  const lengthTarget = target.length
  const weightOfDelete = 1
  const weightOfInsert = 1
  const weightOfSwap = 1
  if (lengthTarget === 0) {
    return lengthSource * weightOfDelete
  }
  if (lengthSource === 0) {
    return lengthTarget * weightOfInsert
  }
  const prefixDistances = []
  for (let row = 0; row <= lengthTarget; row++) {
    prefixDistances.push(Array(lengthSource + 1).fill(0))
  }
  for (let row = 0; row <= lengthTarget; row++) {
    for (let column = 0; column <= lengthSource; column++) {
      let operationCost = 0
      if (row === 0) {
        if (column !== 0) {
          prefixDistances[row][column] = prefixDistances[row][column - 1] + 1
        }
        continue
      } else if (column === 0) {
        prefixDistances[row][column] = prefixDistances[row - 1][column] + 1
      } else {
        if (source[column - 1] !== target[row - 1]) {
          operationCost = weightOfSwap
        }
        prefixDistances[row][column] = Math.min(
          prefixDistances[row - 1][column] + weightOfInsert,
          prefixDistances[row][column - 1] + weightOfDelete,
          prefixDistances[row - 1][column - 1] + operationCost
        )
      }
    }
  }
  return prefixDistances[lengthTarget][lengthSource]
}

// The closestJSWords function takes a string and an array of JavaScript words, computes the edit distance between the string and each JS word, and returns an object containing an array of the closest word(s) and the edit distance between the string and the JS word(s)
const closestJSWords = (givenWord, jsWords) => {
  const firstDistance = editDistance(givenWord, jsWords[0])
  // used if one word closer than all others
  let closestWord = jsWords[0]
  // used if multiple words equidistant
  let closestWords
  let oneWordClosest = true
  let minDistance = firstDistance
  for (let i = 1; i < jsWords.length; i++) {
    const currentWord = jsWords[i]
    const currentDistance = editDistance(givenWord, currentWord)
    if (currentDistance < minDistance) {
      oneWordClosest = true
      closestWord = currentWord
      minDistance = currentDistance
    } else if (currentDistance === minDistance) {
      if (oneWordClosest) {
        closestWords = [closestWord, currentWord]
        oneWordClosest = false
      } else {
        closestWords.push(currentWord)
      }
    }
  }
  if (oneWordClosest) {
    return {words: [closestWord], distance: minDistance}
  }
  return {
    words: closestWords.filter(
      (word, index) => closestWords.lastIndexOf(word) === index
    ),
    distance: minDistance
  }
}

// The replaceWithJSWord function takes a string and determines whether that string is fewer than 'threshold' operations away from a JavaScript word. If it is, it returns the closest JS word. Otherwise, it returns the original string.
const replaceWithJSWord = givenWord => {
  const threshold = 2
  const jsWords = misc.concat(functions.concat(objects))
  const closestWords = closestJSWords(givenWord, jsWords)
  if (closestWords.distance < threshold) {
    console.log(closestWords.words)
    return closestWords.words[0]
  }
  return givenWord
}

module.exports = replaceWithJSWord
