import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import InputOutputWrapper from './edit-page/input-output-wrapper'
import editCode from './edit-code'
import Carousel from './carousel'
import {Typography, withStyles} from './MUIComponents'

const styles = theme => ({
  littleGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    spacing: 40
  },
  date: {
    fontSize: '16px',
    padding: '10px'
  },
  title: {
    fontFamily: theme.typography.fontFamily[1],
    fontSize: '40px',
    color: '#789236',
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
    editedText,
    name,
    classes
  } = props

  return (
    <div>
      <center>
        <Typography component="h2" className={classes.title}>
          Welcome, {name}!
        </Typography>
      </center>
      <Carousel editedText={editedText} handleChange={handleChange} />
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
    name: state.user.name
  }
}

export default connect(mapState)(withStyles(styles)(editCode(UserHome)))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
