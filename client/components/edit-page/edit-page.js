import React, {Component} from 'react'
import {PhotoCapture} from '../../components'
import {connect} from 'react-redux'
import {submitEditedText} from '../../store'

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      editedText: '',
      output: null,
      image: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.readFile()
  }

  handleChange(event) {
    this.setState({editedText: event.target.innerHTML})
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
    const {editedText, output, image} = this.state
    const {text} = this.props
    console.log(image)
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
              onChange={event => this.handleChange(event)}
              value={editedText}
            />
            <div>
              <input type="text" />
              <input type="submit" />
            </div>
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
