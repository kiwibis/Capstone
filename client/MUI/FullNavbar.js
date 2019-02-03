import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const style = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    flexGrow: 2
  },
  toolbar: {
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

const FullNavbar = props => {
  const {classes, isLoggedIn} = props
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit">
            Kiwi
          </Typography>
          <div>
            {isLoggedIn ? (
              <Button variant="outlined" className={classes.button}>
                Home
              </Button>
            ) : (
              <Button variant="outlined" className={classes.button}>
                Login
              </Button>
            )}
          </div>
          <Button variant="outlined" className={classes.button}>
            FAQ
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

FullNavbar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapState)(withStyles(style)(FullNavbar))
