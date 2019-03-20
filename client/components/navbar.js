import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  AppBar,
  Toolbar,
  withStyles,
  Button,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  BreakpointMedia,
  MenuIcon,
  CssBaseline,
  Typography
} from '../util/MUIComponents'
import styles from '../util/styling'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  toggleDrawer = () => () => {
    const status = this.state.open
    this.setState({
      open: !status
    })
  }

  render() {
    const {classes, isLoggedIn, logoutThunk} = this.props
    const loggedIn = [
      {
        text: 'Home',
        link: '/home'
      },
      {
        text: 'Evaluate',
        link: '/'
      },
      {
        text: 'Tips',
        link: '/tips'
      },
      {
        text: 'Contact Us',
        link: '/contact'
      },
      {
        text: 'Logout',
        link: '/logout'
      }
    ]
    const loggedOut = [
      {
        text: 'Evaluate',
        link: '/'
      },
      {
        text: 'Tips',
        link: '/tips'
      },
      {
        text: 'Contact Us',
        link: '/contact'
      },
      {
        text: 'Login',
        link: '/login'
      },
      {
        text: 'Sign Up',
        link: '/signup'
      }
    ]

    const currentList = isLoggedIn ? loggedIn : loggedOut
    return (
      <div>
        <AppBar position="sticky" className={classes.appBar}>
          <div className={classes.titleLink}>
            <Link to="/" className={classes.titleLink}>
              <div className={classes.logoDiv}>
                <img src="/kiwi.png" alt="Kiwi" className={classes.logo} />
                <Typography component="h1" className={classes.navTitle}>
                  Kiwi
                </Typography>
              </div>
            </Link>
          </div>
          <div className={classes.navlinks}>
            <Toolbar className={classes.toolbar}>
              <BreakpointMedia max="xs">
                <div>
                  <SwipeableDrawer
                    anchor="top"
                    open={this.state.open}
                    onClose={this.toggleDrawer()}
                    onOpen={this.toggleDrawer()}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={this.toggleDrawer()}
                      onKeyDown={this.toggleDrawer()}
                    >
                      <div className={classes.fullList}>
                        <List>
                          {currentList.map(item => {
                            if (item.text === 'Logout') {
                              return (
                                <ListItem
                                  button
                                  onClick={logoutThunk}
                                  key={item.text}
                                >
                                  <ListItemText primary={item.text} />
                                </ListItem>
                              )
                            }
                            return (
                              <Link to={item.link} key={item.text}>
                                <ListItem button>
                                  <ListItemText primary={item.text} />
                                </ListItem>
                              </Link>
                            )
                          })}
                        </List>
                      </div>
                    </div>
                  </SwipeableDrawer>

                  <Button onClick={this.toggleDrawer()}>
                    <MenuIcon />
                  </Button>
                </div>
              </BreakpointMedia>
              <BreakpointMedia min="sm">
                <div>
                  {currentList.map(item => {
                    if (item.text === 'Logout') {
                      return (
                        <Button key={item.text} onClick={logoutThunk}>
                          {item.text}
                        </Button>
                      )
                    }
                    return (
                      <Link to={item.link} key={item.text}>
                        <Button>{item.text}</Button>
                      </Link>
                    )
                  })}
                </div>
              </BreakpointMedia>
            </Toolbar>
          </div>
        </AppBar>
        <div className={classes.appBarSpacer} />
        <CssBaseline />
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  logoutThunk: () => dispatch(logout())
})

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Navbar))
