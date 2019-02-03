import React, {Component} from 'react'
import PhotoCapture from '../photo-capture'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import history from '../../history'
import InputOutputWrapper from './input-output-wrapper'
import CodeMirror from './code-mirror'
import jBeautify from 'js-beautify'
import findOrientation from 'exif-orientation'
import Loader from 'react-loader-spinner'
import Evaluator from '../../util/evaluator'

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      testCases: undefined,
      outputs: [],
      image: null,
      imageClass: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.readFile = this.readFile.bind(this)
    this.evaluator = new Evaluator()
  }

  componentDidMount() {
    if (!this.props.loading && !this.props.image) return history.push('/')
    this.readFile()
  }

  handleChange(inputName, inputValue) {
    this.setState({[inputName]: inputValue})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {editedText, testCases} = this.state
    const code = editedText
    // will invoke the function once even if the user doesn't input anything
    const inputs = testCases ? testCases.trim().split('\n') : ['undefined']
    this.props.submitEditedText(editedText)
    try {
      this.setState({
        outputs: await this.evaluator.getResult(code, inputs)
      })
    } catch (error) {
      this.setState({
        outputs: `${error.name ? error.name + ': ' : ''}${error.message}`
      })
    }
  }

  readFile() {
    if (!this.props.image) return
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
    if (this.props.loading)
      return (
        <center>
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </center>
      )
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
    image,
    loading: state.loading
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
