import prettier from 'prettier'

export default function prettify(string) {
  try {
    return prettier.format(string)
  } catch (err) {
    console.log('Error: ', err.toString())
    //this will give us the attempted prettier formatting (even with error detected)
  }
}
