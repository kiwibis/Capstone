import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

const Results = ({testCases, outputs}) => {
  testCases = testCases ? testCases.trim().split('\n') : ['']
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
  const renderText = text => {
    if (['null', 'boolean'].includes(type(text))) {
      return JSON.stringify(text)
    } else if (type(text) === 'undefined') {
      return 'undefined'
    } else {
      return text
    }
  }

  return (
    <Table>
      <TableHead>
        <TableCell>Input</TableCell>
        <TableCell>Output</TableCell>
      </TableHead>
      <TableBody>
        {testCases.map((input, i) => (
          <TableRow key={input}>
            <TableCell>{renderText(input)}</TableCell>
            <TableCell>{renderText(outputs[i])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Results
