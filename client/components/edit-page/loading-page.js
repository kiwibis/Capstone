import React from 'react'
import {PropagateLoader} from 'react-spinners'
import {Paper, withStyles} from '../../util/MUIComponents'
import styles from '../../util/styling'

const Loading = props => {
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
  const index = Math.floor(Math.random() * 8)

  const {classes} = props
  return (
    <div className={classes.loader}>
      <Paper className={classes.paper}>
        <br />
        <br />
        <PropagateLoader
          color="#9AB452"
          size={20}
          loading={true}
          align="center"
          className={classes.item}
        />
        <br />
        <br />
        <br />
        <div className={classes.item}>
          <img
            src={tipsArray[index]}
            alt="Useful Tips"
            className={classes.loadingImage}
          />
        </div>
      </Paper>
    </div>
  )
}
export default withStyles(styles)(Loading)
