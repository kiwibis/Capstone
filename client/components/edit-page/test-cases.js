import React from 'react'

const TestCases = ({onChange, testCases}) => {
  return (
    <textarea
      rows="20"
      cols="50"
      name="testCases"
      onChange={event => {
        const {target} = event
        onChange(target.name, target.value)
      }}
      value={testCases}
    />
  )
}

export default TestCases
