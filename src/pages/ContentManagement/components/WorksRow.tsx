import React, { useState } from 'react'
import { Box, Button, TableCell } from '@material-ui/core'
import { IWorksRow } from '../types'
import { StyledTableRow, useStyles } from '../styles'
import clsx from 'clsx'

interface IWorksRowInterface {
  row: IWorksRow
}

export default function WorksRow(props: IWorksRowInterface) {
  const [isBanned, setIsBanned] = useState(props.row.isActive)
  const handleStatusChange = () => {
    setIsBanned((prevState) => !prevState)
  }

  const classes = useStyles()

  return (
    <StyledTableRow key={props.row.id}>
      <TableCell className={classes.tableCellRoot}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Box className={classes.photoWrapper}>
            <img src={props.row.pictureURL} className={classes.photo} />
          </Box>
          <Box className={classes.tableTextItem}>{props.row.name}</Box>
        </Box>
      </TableCell>
      <TableCell classes={{ root: classes.tableTextItem }} className={classes.tableCellRoot}>
        @{props.row.creator}
      </TableCell>
      <TableCell classes={{ root: classes.tableTextItem }} className={classes.tableCellRoot}>
        @{props.row.owner}
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.userStatus)}>
        {isBanned ? (
          <span className={classes.statusTextActive}>Active</span>
        ) : (
          <span className={classes.statusTextBanned}>Banned</span>
        )}
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        {isBanned ? (
          <Button className={clsx(classes.statusTextBanned, classes.worksRowActionButton)} onClick={handleStatusChange}>
            Ban
          </Button>
        ) : (
          <Button className={clsx(classes.statusTextUnban, classes.worksRowActionButton)} onClick={handleStatusChange}>
            Unban
          </Button>
        )}
      </TableCell>
    </StyledTableRow>
  )
}
