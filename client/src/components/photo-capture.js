import React from 'react'
import {connect} from 'react-redux'

const PhotoCapture = props => {
  const {buttonText} = props

  return (
    <div className="image-upload">
      <label htmlFor="file-input">
        <img src="http://goo.gl/pB9rpQ" />
      </label>

      <input id="file-input" accept="image/*" type="file" />
    </div>
  )
}

export default PhotoCapture
