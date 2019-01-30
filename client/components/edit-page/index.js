import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import jBeautify from 'js-beautify'

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      testCases: '',
      outputs: [],
      image: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.readFile()
  }

  handleChange(inputName, inputValue) {
    this.setState({[inputName]: inputValue})
  }

  handleSubmit(event) {
    event.preventDefault()
    const {editedText, testCases} = this.state
    const code = editedText
    const inputs = testCases.trim().split('\n')
    this.setState({outputs: this.getResult(code, inputs)})
  }

  getResult(code, inputArray) {
    if (code.startsWith('function')) {
      return inputArray.map(input => {
        const codeString = `(${code})(${input})`
        return eval(codeString)
      })
    } else {
      const arrowIndex = code.indexOf('=>')
      const firstHalf = code.slice(0, arrowIndex)
      const constIndex = firstHalf.lastIndexOf('const')
      const noConstSlice = firstHalf.slice(constIndex + 5)
      const endOfWordIndex = noConstSlice.lastIndexOf('=')
      const endOfWord = noConstSlice.slice(0, endOfWordIndex)
      return inputArray.map(input => {
        const funcCall = endOfWord + '(' + input + ')'
        const codeString = code + '\n' + funcCall
        return eval(codeString)
      })
    }
  }

  readFile() {
    try {
      const {text} = this.props
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        this.setState({image: fileReader.result, editedText: jBeautify(text)})
      }
      fileReader.readAsDataURL(this.props.image)
    } catch (err) {
      console.error(err)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.readFile()
    }
  }

  render() {
    const {editedText, testCases, outputs, image} = this.state
    return (
      <div id="EditPage">
        <div>
          <center>
            <img id="edit-image" src={image} />
          </center>
        </div>
        <div>
          <CodeMirror
            editedText={editedText}
            handleChange={this.handleChange}
          />
          <form onSubmit={this.handleSubmit}>
            <InputOutputWrapper
              testCases={testCases}
              outputs={outputs}
              onChange={this.handleChange}
            />
            <input type="submit" />
          </form>
          <PhotoCapture buttonImage="Retake Image" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {text, editedText, image} = state.code
  return {
    text,
    editedText,
    image
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitEditedText: editedText => dispatch(submitEditedText(editedText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage)
