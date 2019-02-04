import React from 'react'
import TestCases from './test-cases'
import Results from './results'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'

function TabContainer(props) {
  return (
    <Typography
      component="div"
      style={{
        padding: 12,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: '1px'
      }}
    >
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  )
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  swipe: {
    width: '100%',
    backgroundColor: theme.palette.secondary
  }
})

class InputOutputWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {
      classes,
      testCases,
      outputs,
      onChange,
      theme,
      handleSubmit
    } = this.props
    const {value} = this.state

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={this.handleChange}
            >
              <LinkTab label="Test Cases" href="page1" />
              <LinkTab label="Results" href="page2" onClick={handleSubmit} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            className={classes.swipe}
          >
            <TabContainer>
              {' '}
              <TestCases testCases={testCases} onChange={onChange} />
            </TabContainer>
            <TabContainer>
              <Results testCases={testCases} outputs={outputs} />
            </TabContainer>
          </SwipeableViews>
        </div>
      </NoSsr>
    )
  }
}

InputOutputWrapper.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(InputOutputWrapper)
