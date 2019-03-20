import React from 'react'
import PhotoCapture from './photo-capture'
import classNames from 'classnames'
import {Grid, Typography, withStyles} from '../util/MUIComponents'
import styles from '../util/styling'

const LandingPage = ({classes}) => {
  return (
    <div className={classes.landing}>
      <Typography component="h1" className={classes.landingTitle}>
        The App that Lets You Run Handwritten JavaScript
      </Typography>
      <div>
        <PhotoCapture text="Try it now!" />
        <br />
        <br />
      </div>
      <div>
        <Grid container className={classes.landingGrid}>
          <Grid
            item
            xs={12}
            sm={4}
            className={classNames([classes.card, classes.card1])}
          >
            <Typography component="h4" className={classes.landingCardsTitle}>
              Take a picture
            </Typography>
            <br />
            <br />
            <div>
              <center>
                <img
                  src="/whiteboard.png"
                  alt="Code on a whiteboard"
                  className={classes.landingImage}
                />
              </center>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className={classNames([classes.card, classes.card2])}
          >
            <Typography component="h4" className={classes.landingCardsTitle}>
              Input your test cases
            </Typography>
            <br />
            <br />
            <div>
              <center>
                <img
                  className={classes.landingImage}
                  src="/inputs.png"
                  alt="User input to run code"
                />
              </center>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className={classNames([classes.card, classes.card3])}
          >
            <Typography component="h4" className={classes.landingCardsTitle}>
              Check your results
            </Typography>
            <br />
            <br />
            <div>
              <center>
                <img
                  className={classes.landingImage}
                  src="/results.png"
                  alt="Results of your code"
                />
              </center>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles)(LandingPage)
