import React from 'react'
import TestCases from './test-cases'
import Results from './results'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {
  withStyles,
  AppBar,
  Tab,
  Tabs,
  Typography,
  NoSsr
} from '../MUIComponents'

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
      handleSubmit,
      running
    } = this.props
    const {value} = this.state

    return (
      <NoSsr>
        <div id="inputOutput" className={classes.root}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={this.handleChange}
            >
              <LinkTab label="Test Cases" href="page1" />
              <LinkTab
                label="Results"
                href="page2"
                onClick={handleSubmit}
                disabled={running}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            resistance
            onSwitching={index => this.handleChange(null, index)}
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
