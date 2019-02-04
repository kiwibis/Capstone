import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: '80%',
    height: '80%'
  }
})

const TestCases = ({onChange, testCases, classes}) => {
  console.log('new test case')
  return (
    <TextField
      id="outlined-textarea"
      label="Input"
      placeholder="Make sure you write each test case on a separate line."
      multiline
      className={classes.textField}
      margin="normal"
      variant="outlined"
      fullWidth={true}
      name="testCases"
      onChange={event => {
        console.log(event)
        const {target} = event
        onChange(target.name, target.value)
      }}
      value={testCases}
    />
  )
}

export default withStyles(styles)(TestCases)
