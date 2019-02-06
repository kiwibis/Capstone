import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import InputOutputWrapper from './edit-page/input-output-wrapper'
import editCode from './edit-code'
import {withStyles} from '@material-ui/core/styles'
import Carousel from './carousel'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  littleGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    spacing: 40
  },
  title: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '20px',
    padding: '10px'
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
      <center>
        <Typography component="h2" className={classes.title}>
          Welcome, {email}!
        </Typography>
      </center>
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
