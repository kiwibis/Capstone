import React from 'react'
import {connect} from 'react-redux'
import {sendImage, setLoadingTrue} from '../store'
import history from '../history'
import AddAPhotoRounded from '@material-ui/icons/AddAPhotoRounded'
import {Icon, SvgIcon, Button} from '@material-ui/core'

class PhotoCapture extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const file = event.target.files[0]
    this.props.setLoadingTrue()
    this.props.sendImage(file)
    history.push('/editPage')
  }

  render() {
    const {buttonText} = this.props
    return (
      <div className="image-upload">
        <label htmlFor="file-input">
          <AddAPhotoRounded color="primary" fontSize="large" />
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
  setLoadingTrue: () => dispatch(setLoadingTrue()),
  sendImage: image => dispatch(sendImage(image))
})

export default connect(
  null,
  mapDispatch
)(PhotoCapture)
