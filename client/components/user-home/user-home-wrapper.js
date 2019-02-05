import React from 'react'
import {connect} from 'react-redux'
import {deleteFunctionInServer, updateFunctionInServer} from '../../store'
import PropTypes from 'prop-types'
import editCodeWrapper from '../edit-code'
import UserHome from './user-home'
/**
 * COMPONENT
 */
class UserHomeWrapper extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UserHome {...this.props} />
      </React.Fragment>
    )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editCodeWrapper(UserHomeWrapper))

/**
 * PROP TYPES
 */
UserHomeWrapper.propTypes = {
  email: PropTypes.string
}
