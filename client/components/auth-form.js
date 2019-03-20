import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  LockOutlinedIcon,
  Paper,
  Typography,
  withStyles
} from '../util/MUIComponents'
import styles from '../util/styling'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <main className={classes.authMain}>
      <CssBaseline />
      <Paper className={classes.authPaper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {displayName}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} name={name}>
          {name === 'signup' ? (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">Your Name</InputLabel>
              <Input
                id="userName"
                name="userName"
                autoComplete="name"
                autoFocus
              />
            </FormControl>
          ) : (
            ''
          )}
          {name === 'signup' ? (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" />
            </FormControl>
          ) : (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
          )}

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <br />
      </Paper>
    </main>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userName = evt.target.userName ? evt.target.userName.value : null

      dispatch(auth(email, password, formName, userName))
    }
  }
}

export const Login = connect(
  mapLogin,
  mapDispatch
)(withStyles(styles)(AuthForm))
export const Signup = connect(
  mapSignup,
  mapDispatch
)(withStyles(styles)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
