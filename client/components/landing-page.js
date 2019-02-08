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
    justifyContent: 'flex-start',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  card1: {
    backgroundColor: '#D9DB9F',
    textAlign: 'center'
  },
  card2: {
    backgroundColor: '#9AB452',
    textAlign: 'center'
  },
  card3: {
    backgroundColor: '#789236',
    textAlign: 'center'
  },
  titleFont: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    padding: '10% 6px 3%'
  },
  image: {
    maxWidth: '90%'
  },
  title: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '40px',
    color: '#789236',
    textAlign: 'center',
    margin: '0 5px 5px'
  }
})

const LandingPage = ({classes}) => {
  return (
    <div className={classes.landing}>
      <Typography component="h1" className={classes.title}>
        The App that Lets You Run Handwritten JavaScript
      </Typography>
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
            <Typography component="h4" className={classes.titleFont}>
              Take a picture
            </Typography>
            <br />
            <br />
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
            <Typography component="h4" className={classes.titleFont}>
              Input your test cases
            </Typography>
            <br />
            <br />
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
            <Typography component="h4" className={classes.titleFont}>
              Check your results
            </Typography>
            <br />
            <br />
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
