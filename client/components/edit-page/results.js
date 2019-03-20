import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '../MUIComponents'

const Results = ({testCases, outputs}) => {
  testCases = testCases ? testCases.trim().split('\n') : ['']
  if (typeof outputs === 'string') {
    // only occurs in the case there's an error
    return <p>{outputs}</p>
  } else if (outputs.length === 0) {
    return <p>No output</p>
  }

  return (
    <Table align="center">
      <TableHead>
        <TableRow>
          <TableCell align="center">Input</TableCell>
          <TableCell align="center">Output</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {testCases.map((input, i) => (
          <TableRow key={input}>
            <TableCell align="center">{input + ''}</TableCell>
            <TableCell align="center">{outputs[i] + ''}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Results
