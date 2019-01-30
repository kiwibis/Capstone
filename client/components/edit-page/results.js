import React from 'react'

const Results = ({testCases, outputs}) => {
  testCases = testCases.split('\n')
  return (
    <ul>
      {testCases.map((input, i) => (
        <li key={i}>
          <div>
            <bold>Input: </bold> {input}
          </div>
          <div>
            <bold>Your Outputs: </bold>
            {outputs[i]}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Results
