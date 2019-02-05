import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

const Results = ({testCases, outputs}) => {
  testCases = testCases ? testCases.trim().split('\n') : ['']
  if (typeof outputs === 'string') {
    // only occurs in the case there's an error
    return <p>{outputs}</p>
  } else if (outputs.length === 0) {
    return <p>No output</p>
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Input</TableCell>
          <TableCell>Output</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {testCases.map((input, i) => (
          <TableRow key={input}>
            <TableCell>{input + ''}</TableCell>
            <TableCell>{outputs[i] + ''}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Results
