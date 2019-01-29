import React, {Component} from 'react'
import {PhotoCapture} from '../../components'

class EditPage extends Component {
  constructor() {
    super()
    this.state = {
      originalText: this.props.code.text,
      editedText: this.props.code.text,
      image: this.props.code.image
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({editedText: event.target.innerHTML})
  }

  render() {
    const {image, editedText, originalText} = this.state

    return (
      <div id="EditPage">
        <div>
          <img src={image} />
          <PhotoCapture buttonImage="Retake Image" />
        </div>
        <div>
          <form>
            <textarea onChange={event => this.handleChange(event)}>
              {editedText}
            </textarea>
            <div>
              <input type="text" />
              <input type="submit" />
            </div>
          </form>
        </div>
        <div>
          <p>{this.state.output}</p>
        </div>
      </div>
    )
  }
}

export default EditPage
