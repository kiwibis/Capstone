import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const style = theme => ({
  landing: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  grid: {
    spacing: 16
  },
  title: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '40px',
    textAlign: 'center',
    padding: '0 6px',
    color: '#789236'
  },
  image: {
    width: '80%'
  },
  item: {
    padding: '5% 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

const TipsPage = ({classes}) => {
  const tipsArray = [
    '/tip1.png',
    '/tip2.png',
    '/tip3.png',
    '/tip4.png',
    '/tip5.png',
    '/tip6.png',
    '/tip7.png',
    '/tip8.png'
  ]
  return (
    <div className={classes.landing}>
      <Typography component="h1" className={classes.title}>
        Tips for Getting the Most Out of Kiwi
      </Typography>
      <Grid container className={classes.grid}>
        {tipsArray.map((tip, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={3}
            className={classes.item}
          >
            <img src={tip} alt={`Tip ${index + 1}`} className={classes.image} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default withStyles(style)(TipsPage)
