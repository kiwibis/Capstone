import React from 'react'
import PhotoCapture from './photo-capture'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'

const style = theme => ({
  landing: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    alignItems: 'center'
  },
  grid: {
    spacing: 16
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '30vw',
    height: '60vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  card1: {
    backgroundColor: '#D9DB9F'
  },
  card2: {
    backgroundColor: '#9AB452'
  },
  card3: {
    backgroundColor: '#789236'
  },
  titleFont: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    padding: 8
  },
  image: {
    maxWidth: '90%'
  }
})

const LandingPage = ({classes}) => {
  return (
    <div className={classes.landing}>
      <div>
        <PhotoCapture text="Try it now!" />
        <br />
        <br />
      </div>
      <div>
        <Grid container className={classes.grid}>
          <Grid
            item
            xs={12}
            sm={4}
            className={classNames([classes.card, classes.card1])}
          >
            <div className={classes.card1}>
              <Typography component="h4" className={classes.titleFont}>
                Take a picture of your JS function
              </Typography>
              <br />
              <br />
            </div>
            <div>
              <center>
                <img
                  src="/whiteboard.png"
                  alt="Code on a whiteboard"
                  className={classes.image}
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
            <div className={classes.card2}>
              <Typography component="h4" className={classes.titleFont}>
                Input your testcases
              </Typography>
              <br />
              <br />
            </div>
            <div>
              <center>
                <img
                  className={classes.image}
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
            <div className={classes.card3}>
              <Typography component="h4" className={classes.titleFont}>
                Check your results!
              </Typography>
              <br />
              <br />
            </div>
            <div>
              <center>
                <img
                  className={classes.image}
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

export default withStyles(style)(LandingPage)