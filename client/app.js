import React from 'react'
import Navbar from './MUI/FullNavbar'
import Routes from './routes'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    common: {black: 'rgba(0, 0, 0, 1)', white: '#fff'},
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(244, 246, 241, 1)'
    },
    primary: {
      light: 'rgba(217, 219, 159, 1)',
      main: 'rgba(154, 180, 82, 1)',
      dark: 'rgba(85, 100, 31, 1)',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(85, 100, 31, 1)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})

class App extends React.Component {
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
        <MuiThemeProvider theme={theme}>
          <Navbar menuOpen={this.state.menuOpen} toggleMenu={this.toggleMenu} />
          <Routes />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
