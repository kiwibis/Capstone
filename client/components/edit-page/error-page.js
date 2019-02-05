import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Link} from 'react-router-dom'

const ErrorPage = ({classes, error}) => {
  let message
  if (error.includes("'detectedLanguages'")) {
    // this is the error that usually comes when the picture is poor
    message = "It's possible this was a poor image. Please visit our "
  } else if (error.includes("'pages'")) {
    // this is the error that usually comes when there is no text detected
    message =
      "It's possible that the photo you uploaded doesn't actually contain text. " +
      'Please visit our '
  } else {
    message =
      'Oops! Something went wrong with the photo you just uploaded. ' +
      'Please visit our '
  }
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Error from the Server
        </Typography>
        <Typography
          className={classes.errorPage}
          variant="h5"
          gutterBottom
          align="center"
        >
          {message}
          <Link to="/faq">FAQ</Link>
          {' in order to learn the best pictures to use with our application.'}
        </Typography>
      </Paper>
    </div>
  )
}

export default ErrorPage
