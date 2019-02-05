import React from 'react'
import {connect} from 'react-redux'
import {deleteFunctionInServer, updateFunctionInServer} from '../store'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CodeMirrorWrapper from './edit-page/code-mirror'

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

/**
 * COMPONENT
 */

const UserHome = props => {
  const {classes, email, functions} = props
  return (
    <div className={classes.root}>
      <h3>Welcome, {email}</h3>
      <GridList className={classes.gridList} cols={2.5}>
        {functions.map(func => (
          <GridListTile key={func.id}>
            <CodeMirrorWrapper editedText={func.userEditedText} />
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

/**
 * CONTAINER
 */

const mapStateToProps = state => {
  return {
    email: state.user.email,
    functions: state.userFunctions
  }
}

const mapDispatchToProps = dispatch => ({
  removeFunction: id => dispatch(deleteFunctionInServer(id)),
  updateFunction: (id, newEditedText) =>
    dispatch(updateFunctionInServer(id, newEditedText))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserHome))

/**
 * PROP TYPES
 */

UserHome.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired
}
