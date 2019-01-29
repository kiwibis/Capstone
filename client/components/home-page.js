import React from 'react'
import {PhotoCapture} from '.'

const HomePage = () => {
  return (
    <div id="HomePage">
      <div id="brand-info">
        <h3 id="brand-name">Kiwibis</h3>
        <p id="brand-description">The app that lets you run your REACTOs</p>
      </div>
      <PhotoCapture buttonText="Try it now" />
    </div>
  )
}

export default HomePage
