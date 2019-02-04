import React from 'react'
import PhotoCapture from './photo-capture'

const HomePage = () => {
  return (
    <div id="HomePage">
      <div id="brand-info">
        <h3 id="brand-description">The app that lets you run your REACTOs!</h3>
      </div>
      <div>
        <h4>Take or Upload Photo</h4>
        <PhotoCapture buttonText="Try it now" />
      </div>
    </div>
  )
}

export default HomePage
