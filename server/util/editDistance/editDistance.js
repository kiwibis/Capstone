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
    //row = i
    for (let column = 0; column <= lengthSource; column++) {
      //column = j
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

// The editDistance function returns the minimum number of operations
// (insertions, deletions, and swaps) required to transform the first i
// chars of string1 into the first j chars of string2
// function editDistance(
//   string1,
//   string2,
//   i = string1.length,
//   j = string2.length
// ) {
//   // If one string is empty, the only option is to
//   // insert all characters of the other
//   if (Math.min(i, j) === 0) {
//     return Math.max(i, j)
//   } else {
//     // If last characters of two strings are same, ignore
//     // last characters and get distance for remaining strings.
//     if (string1[i - 1] === string2[j - 1]) {
//       return editDistance(string1, string2, i - 1, j - 1)
//     }
//     // If last characters are not same, consider all three
//     // operations on last character of first string, recursively
//     // compute minimum cost for all three operations and take
//     // minimum of three values.
//     return Math.min(
//       editDistance(string1, string2, i - 1, j) + weightOfDelete, //Delete
//       editDistance(string1, string2, i, j - 1) + weightOfInsert, //Insert
//       editDistance(string1, string2, i - 1, j - 1) + weightOfSwap //Swap
//     )
//   }
// }

module.exports = editDistance
