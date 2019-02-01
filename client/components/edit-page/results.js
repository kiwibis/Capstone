import React from 'react'

const Results = ({testCases, outputs}) => {
  testCases = testCases.trim().split('\n')
  if (typeof outputs === 'string') {
    return outputs
  } else if (outputs.length === 0) {
    return 'No Output'
  }
  const type = elem =>
    Object.prototype.toString
      .call(elem)
      .slice(8, -1)
      .toLowerCase()
  return (
    <ul>
      {testCases.map((input, i) => (
        <li key={i}>
          <div>Input: {input}</div>
          <div>
            Your Output:{' '}
            {['null', 'undefined'].includes(type(outputs[i]))
              ? type(outputs[i])
              : outputs[i]}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Results
