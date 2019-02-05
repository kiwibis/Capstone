const reversePrinter = arr => {
  if (arr.length === 1) {
    console.log(arr[0])
  } else {
    console.log(arr.pop())
    reversePrinter(arr)
  }
}
