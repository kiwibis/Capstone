import React from 'react'
import {Typography, Paper, CssBaseline} from '../../util/MUIComponents'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'
// import CssBaseline from '@material-ui/core/CssBaseline'
import {Link} from 'react-router-dom'

const ErrorPage = ({classes, error}) => {
  let message
  const seeTips =
    ' Please visit our tips page to learn how to get the best possible results when using Kiwi.'
  if (error.includes("'detectedLanguages'")) {
    // this is the error that usually comes when the picture is poor
    message =
      "It's possible that the quality of the photo you uploaded was too poor." +
      seeTips
  } else if (error.includes("'pages'")) {
    // this is the error that usually comes when there is no text detected
    message =
      "It's possible that the photo you uploaded doesn't actually contain text." +
      seeTips
  } else {
    message =
      'Oops! Something went wrong with the photo you just uploaded.' + seeTips
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
          <Link to="/tips">Tips</Link>
        </Typography>
      </Paper>
    </div>
  )
}

export default ErrorPage
