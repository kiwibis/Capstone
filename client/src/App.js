import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      openMenu: false
    }
    this.handleMenu = this.handleMenu.bind(this)
  }

  handleMenu() {
    this.setState(state => ({
      openMenu: !state.openMenu
    }))
  }

  render() {
    return (
      <div>
        <Navbar openMenu={this.state.openMenu} handleMenu={this.handleMenu} />
        <Routes />
      </div>
    )
  }
}
