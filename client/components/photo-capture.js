import React from 'react'
import {connect} from 'react-redux'
import {sendImage} from '../store'

class PhotoCapture extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const file = event.target.files[0]

    this.props.sendImage(file)
  }

  render() {
    const {buttonText} = this.props
    return (
      <div className="image-upload">
        <label htmlFor="file-input">
          <img src="http://goo.gl/pB9rpQ" />
        </label>

        <input
          id="file-input"
          accept="image/*"
          type="file"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  sendImage: image => dispatch(sendImage(image))
})

export default connect(
  null,
  mapDispatch
)(PhotoCapture)
