import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import TestCases from './test-cases'
import Results from './results'
import {withStyles, AppBar, Tab, Tabs, Typography} from '../MUIComponents'

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
})

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  handleChangeIndex = index => {
    this.setState({value: index})
  }

  render() {
    const {classes, theme} = this.props
    console.log(this.props.outputs)

    return (
      <div id="full-width-tabs" className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Test Cases" />
            <Tab label="Results" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <div
              id="input"
              className={`tabcontent ${this.props.testCasesClassName}`}
            >
              <TestCases
                testCases={this.props.testCases}
                onChange={this.props.onChange}
              />
            </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <div
              id="results"
              className={`tabcontent ${this.props.resultsClassName}`}
            >
              <Results
                testCases={this.props.testCases}
                outputs={this.props.outputs}
              />
            </div>
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(FullWidthTabs)
