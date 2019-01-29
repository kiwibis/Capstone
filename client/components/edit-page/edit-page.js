import React, {Component} from 'react'
import {PhotoCapture} from '../../components'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'
import TestCases from './test-cases'

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      testCases: '',
      output: null,
      image: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.readFile()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
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
    const {editedText, testCases, output, image} = this.state
    const {text} = this.props
    return (
      <div id="EditPage">
        <div>
          <img id="edit-image" src={image} />
        </div>
        <div>
          <form>
            <textarea
              autoFocus="true"
              rows="20"
              cols="50"
              name="editedText"
              onChange={this.handleChange}
              value={editedText}
            />
            <TestCases value={testCases} onChange={this.handleChange} />
            <input type="submit" />
          </form>
          <PhotoCapture buttonImage="Retake Image" />
        </div>
        <div>
          <p>{output}</p>
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
