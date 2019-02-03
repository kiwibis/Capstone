import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import BreakpointMedia from 'react-media-material-ui/BreakpointMedia'
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

const style = theme => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarSpacer: {
    minHeight: '30px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexEnd',
    justifyContent: 'space-around'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  dropdown: {
    width: 'auto'
  },
  titleLink: {
    paddingLeft: '20px',
    flexGrow: 4
  }
})

class FullNavbar extends React.Component {
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
    const {classes, isLoggedIn} = this.props
    const loggedIn = [
      {
        text: 'Home',
        link: '/home'
      },
      {
        text: 'Evaluate',
        link: '/evaluate'
      },
      {
        text: 'FAQs',
        link: '/faq'
      },
      {
        text: 'Logout',
        link: '/logout'
      }
    ]
    const loggedOut = [
      {
        text: 'Evaluate',
        link: '/evaluate'
      },
      {
        text: 'FAQs',
        link: '/faq'
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
        <AppBar position="static" className={classes.appBar}>
          <div className={classes.titleLink}>
            <Typography variant="title" color="inherit">
              Kiwi
            </Typography>
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
                          {currentList.map(item => (
                            <Link to={item.link} key={item.text}>
                              <ListItem button>
                                <ListItemText primary={item.text} />
                              </ListItem>
                            </Link>
                          ))}
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
                  {currentList.map(item => (
                    <Link to={item.link} key={item.text}>
                      <Button>{item.text}</Button>
                    </Link>
                  ))}
                </div>
              </BreakpointMedia>
            </Toolbar>
          </div>
        </AppBar>
        <div className={classes.appBarSpacer} />
      </div>
    )
  }
}

FullNavbar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapState)(withStyles(style)(FullNavbar))
