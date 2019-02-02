import React from 'react'

const Results = ({testCases, outputs}) => {
  testCases = testCases.trim().split('\n')
  if (typeof outputs === 'string') {
    return outputs
  } else if (outputs.length === 0) {
    return 'No Output'
  }

  const type = text =>
    Object.prototype.toString
      .call(text)
      .slice(8, -1)
      .toLowerCase()
  const renderText = output => {
    const outputType = type(output)
    if (outputType === 'null' || outputType === 'undefined') {
      return outputType
    } else if (outputType === 'boolean') {
      return output ? 'true' : 'false'
    } else {
      return output
    }
  }
  return (
    <ul>
      {testCases.map((input, i) => (
        <li key={i}>
          <div>Input: {renderText(input)}</div>
          <div>Your Output: {renderText(outputs[i])}</div>
        </li>
      ))}
    </ul>
  )
}

export default Results
