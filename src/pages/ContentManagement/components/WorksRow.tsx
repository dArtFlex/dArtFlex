import React, { useState } from 'react'
import { Box, Button, TableCell } from '@material-ui/core'
import { IWorksRow } from '../types'
import { StyledTableRow, useStyles } from '../styles'

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
      <TableCell>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Box className={classes.photoWrapper}>
            <img src={props.row.pictureURL} className={classes.photo} />
          </Box>
          <Box className={classes.tableTextItem}>{props.row.name}</Box>
        </Box>
      </TableCell>
      <TableCell classes={{ root: classes.tableTextItem }}>@{props.row.creator}</TableCell>
      <TableCell classes={{ root: classes.tableTextItem }}>@{props.row.owner}</TableCell>
      <TableCell>
        {isBanned ? (
          <span className={classes.statusTextActive}>Active</span>
        ) : (
          <span className={classes.statusTextBanned}>Banned</span>
        )}
      </TableCell>
      <TableCell>
        {isBanned ? (
          <Button className={classes.statusTextBanned} onClick={handleStatusChange}>
            Ban
          </Button>
        ) : (
          <Button className={classes.statusTextUnban} onClick={handleStatusChange}>
            Unban
          </Button>
        )}
      </TableCell>
    </StyledTableRow>
  )
}
