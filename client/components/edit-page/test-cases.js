import React from 'react'

const TestCases = ({onChange, testCases}) => {
  return (
    <textarea
      rows="20"
      cols="50"
      name="testCases"
      onChange={onChange}
      value={testCases}
    />
  )
}

export default TestCases
