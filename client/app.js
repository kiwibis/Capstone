import React from 'react'
import Navbar from './MUI/Navbar'
import Routes from './routes'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    common: {black: '#000', white: '#fff'},
    background: {paper: '#fff', default: '#fafafa'},
    primary: {
      light: 'rgba(217, 219, 159, 1)',
      main: 'rgba(154, 181, 66, 1)',
      dark: 'rgba(85, 100, 31, 1)',
      contrastText: 'rgba(255, 255, 255, 1)'
    },
    secondary: {
      light: 'rgba(217, 219, 150, 1)',
      main: 'rgba(197, 227, 139, 1)',
      dark: 'rgba(85, 100, 47, 1)',
      contrastText: '#fff'
    },
    error: {
      light: 'rgba(185, 245, 231, 1)',
      main: 'rgba(70, 189, 163, 1)',
      dark: 'rgba(7, 206, 162, 1)',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(85, 100, 31, 1)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['']
  }
})

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <span />
          <span />
          <Routes />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
