import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import jBeautify from 'js-beautify'
import findOrientation from 'exif-orientation'

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      testCases: '',
      outputs: [],
      image: null,
      imageClass: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.readFile = this.readFile.bind(this)
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
    const inputs = testCases.split('\n')
    this.setState({outputs: this.getResult(code, inputs)})
  }

  getResult(code, inputArray) {
    if (code.startsWith('function')) {
      return inputArray.map(input => {
        const codeString = `(${code})(${input})`
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
        this.setState({image: fileReader.result, editedText: jBeautify(text)})
      }
      fileReader.readAsDataURL(this.props.image)
      findOrientation(this.props.image, (err, orientation) => {
        if (!err) {
          if (orientation.rotate === 90) {
            this.setState({
              imageClass: 'rotate'
            })
          } else {
            this.setState({
              imageClass: ''
            })
          }
        }
      })
      console.log(this.props.image)
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
    const {editedText, testCases, outputs, image, imageClass} = this.state
    return (
      <div id="EditPage">
        <div>
          <center>
            <img className={imageClass} id="edit-image" src={image} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage)
