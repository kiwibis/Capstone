console.log(
  eval(
    `const testMe = num => {for (let i = 0; i < 3; i++){ num = num * num } return num; }
    testMe(3)`
  )
)
