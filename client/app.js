import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      menuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState(state => ({
      menuOpen: !state.menuOpen
    }))
  }

  render() {
    return (
      <div>
        <Navbar menuOpen={this.state.menuOpen} toggleMenu={this.toggleMenu} />
        <Routes />
      </div>
    )
  }
}
