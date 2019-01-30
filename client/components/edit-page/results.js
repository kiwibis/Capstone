import React from 'react'

const Results = ({testCases, outputs}) => {
  testCases = testCases.trim().split('\n')
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
