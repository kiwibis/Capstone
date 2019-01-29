import React from 'react'

const Results = ({testCases, output}) => {
  testCases = testCases.split('\n')
  output = output.split('\n')
  return (
    <ul>
      {testCases.map((input, i) => (
        <li key={i}>
          <div>
            <bold>Input: </bold> {input}
          </div>
          <div>
            <bold>Your Output: </bold>
            {output[i]}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Results
