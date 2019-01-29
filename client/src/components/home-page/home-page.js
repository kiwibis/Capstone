import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PhotoCapture} from '../../components'

class HomePage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="HomePage">
        <div id="brand-info">
          <h3 id="brand-name">Kiwibis</h3>
          <p id="brand-description">The app that lets you run your REACTOs</p>
        </div>
        <PhotoCapture buttonImage="Try it now" />
      </div>
    )
  }
}

export default HomePage
