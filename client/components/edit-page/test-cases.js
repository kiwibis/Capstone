import React from 'react'

const TestCases = ({onChange, value}) => {
  return (
    <textarea
      rows="20"
      cols="50"
      name="testCases"
      onChange={onChange}
      value={value}
    />
  )
}

export default TestCases
