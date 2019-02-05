import React from 'react'
import {PropagateLoader} from 'react-spinners'
import Paper from '@material-ui/core/Paper'
import {css} from '@emotion/core'
import {withStyles} from '@material-ui/core/styles'

const style = () => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90vw',
    height: 'auto',
    minHeight: '90vh',
    padding: 10
  },
  items: {
    width: '70vw'
  }
})

const Loading = props => {
  const tipsArray = [
    '/tip1.png',
    '/tip2.png',
    '/tip3.png',
    '/tip4.png',
    '/tip5.png',
    '/tip6.png',
    '/tip7.png'
  ]
  const index = Math.floor(Math.random() * 7)

  const {classes} = props
  return (
    <div className="loader">
      <Paper className={classes.paper}>
        <div className={classes.item}>
          <PropagateLoader
            color="#9AB452"
            size={20}
            loading={true}
            align="center"
          />
        </div>
        <div>
          <img
            src={tipsArray[index]}
            alt="Useful Tips"
            className={classes.item}
          />
        </div>
      </Paper>
    </div>
  )
}
export default withStyles(style)(Loading)
