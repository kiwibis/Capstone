import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {deleteFunctionInServer, updateFunctionInServer} from '../../store'
import PropTypes from 'prop-types'
import UserHome from './user-home'
/**
 * COMPONENT
 */
class UserHomeWrapper extends React.Component {
  render() {
    return <UserHome {...this.props} />
  }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserHome))

/**
 * PROP TYPES
 */

UserHomeWrapper.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired
}
