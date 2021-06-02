import React from 'react'
import { TableCell, TableRow, TableHead as MUITableHead } from '@material-ui/core'
import { ITableHead } from './types'

export default function TableHead(props: ITableHead) {
  const { headCells, controls } = props

  return (
    <MUITableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.accessor} padding="default">
            {headCell.header}
          </TableCell>
        ))}

        {controls !== undefined && <TableCell />}
      </TableRow>
    </MUITableHead>
  )
}
