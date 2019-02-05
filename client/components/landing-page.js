import React from 'react'
import PhotoCapture from './photo-capture'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const style = theme => ({
  landing: {
    display: 'flex',
    flexDirection: 'column'
  }
})

const LandingPage = ({classes}) => {
  return (
    <div className={classes.landing}>
      <div>
        <PhotoCapture />
      </div>
      <div>
        <Grid container>
          <Grid item>
            <Typography component="h4">Item 1</Typography>
          </Grid>
          <Grid item>
            <Typography component="h4">Item 2</Typography>
          </Grid>
          <Grid item>
            <Typography component="h4">Item 3</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(style)(LandingPage)
