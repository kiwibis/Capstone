import React from 'react'
import {withStyles, TextField} from '../../util/MUIComponents'
import styles from '../../util/styling'

const TestCases = ({onChange, testCases, classes}) => {
  return (
    <TextField
      id="outlined-textarea"
      label="Input"
      placeholder="Write each test case on a separate line."
      multiline
      className={classes.textField}
      margin="normal"
      variant="outlined"
      fullWidth={true}
      name="testCases"
      onChange={event => {
        const {target} = event
        onChange(target.name, target.value)
      }}
      value={testCases}
    />
  )
}

export default withStyles(styles)(TestCases)
