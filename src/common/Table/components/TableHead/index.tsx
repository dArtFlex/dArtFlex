import React from 'react'
import { TableCell, TableRow, TableHead as MUITableHead } from '@material-ui/core'
import { ITableHead } from './types'
import { useStyles } from '../../styles'

export default function TableHead(props: ITableHead) {
  const { headCells, controls } = props
  const classes = useStyles()

  return (
    <MUITableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.accessor} padding="default" className={classes.tableCell}>
            {headCell.header}
          </TableCell>
        ))}

        {controls !== undefined && <TableCell />}
      </TableRow>
    </MUITableHead>
  )
}
