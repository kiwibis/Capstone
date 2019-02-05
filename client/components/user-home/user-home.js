import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CodeMirror from '../edit-page/code-mirror'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
})

const UserHome = props => {
  const {classes, email, functions, handleChange} = props
  return (
    <div className={classes.root}>
      <h3>Welcome, {email}</h3>
      <GridList className={classes.gridList} cols={2.5}>
        {functions.map(func => (
          <GridListTile key={func.id}>
            <CodeMirror
              editedText={func.userEditedText}
              handleChange={handleChange}
            />
            <GridListTileBar
              title={func.updatedAt}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

UserHome.propTypes = {
  email: PropTypes.string,
  updateFunction: PropTypes.func,
  removeFunction: PropTypes.func
}

export default withStyles(styles)(UserHome)
