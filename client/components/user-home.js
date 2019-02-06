import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import InputOutputWrapper from './edit-page/input-output-wrapper'
import editCode from './edit-code'
import {withStyles} from '@material-ui/core/styles'
import Carousel from './MUI-carousel'

const styles = theme => ({
  littleGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    spacing: 40
  }
})

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    testCasesRunning,
    testCases,
    outputs,
    handleChange,
    handleSubmit,
    email,
    classes
  } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Carousel {...props} />
      <form onSubmit={handleSubmit} className={classes.littleGrid}>
        <InputOutputWrapper
          running={testCasesRunning}
          testCases={testCases}
          outputs={outputs}
          onChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(withStyles(styles)(editCode(UserHome)))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
