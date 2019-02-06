import React from 'react'
import {PropagateLoader} from 'react-spinners'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'

const style = () => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flexStart'
  },
  items: {
    padding: '20px'
  },
  image: {
    maxWidth: '90vw',
    padding: '30px'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
            className={classes.image}
          />
        </div>
      </Paper>
    </div>
  )
}
export default withStyles(style)(Loading)
