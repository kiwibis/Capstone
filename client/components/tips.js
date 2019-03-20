import React from 'react'
import {Grid, Typography, withStyles} from '../util/MUIComponents'
import styles from '../util/styling'

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
    <div className={classes.tipsLanding}>
      <Typography component="h1" className={classes.title}>
        Tips for Getting the Most Out of Kiwi
      </Typography>
      <Grid container className={classes.landingGrid}>
        {tipsArray.map((tip, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={3}
            className={classes.tipItem}
          >
            <img src={tip} alt={`Tip ${index + 1}`} className={classes.menu} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default withStyles(styles)(TipsPage)
