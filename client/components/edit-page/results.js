import React from 'react'

const Results = ({testCases, outputs}) => {
  testCases = testCases.trim().split('\n')
  if (typeof outputs === 'string') {
    return outputs
  } else if (outputs.length === 0) {
    return 'No Output'
  }
  return (
    <ul>
      {testCases.map((input, i) => (
        <li key={i}>
          <div>Input: {input}</div>
          <div>
            Your Outputs:
            {outputs[i]}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Results
