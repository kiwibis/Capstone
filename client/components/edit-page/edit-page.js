import React, {Component} from 'react'
import {PhotoCapture} from '../../components'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import {InputOutputWrapper} from './index'

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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const {editedText, testCases} = this.state
    const code = editedText
    console.log(code)
    console.log(typeof code)
    // const input = event.target.input.value
    const input = testCases.split('\n')
    console.log(input)
    this.setState({outputs: this.getResult(code, input)})
  }

  getResult(code, inputArray) {
    if (code.slice(0, 8) === 'function') {
      return inputArray.map(input => {
        const codeString = `(${code})(${input})`
        console.log('codestring', codestring)
        return eval(codeString)
      })
    } else {
      const index = code.indexOf('=')
      const tempFunc = eval(code.slice(index + 1))
      return inputArray.map(input => {
        return tempFunc(input)
      })
    }
  }

  readFile() {
    try {
      const {text} = this.props
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        this.setState({image: fileReader.result, editedText: text})
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
    const {text} = this.props
    return (
      <div id="EditPage">
        <div>
          <img id="edit-image" src={image} />
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <textarea
              autoFocus={true}
              rows="20"
              cols="50"
              name="editedText"
              onChange={this.handleChange}
              value={editedText}
            />
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
