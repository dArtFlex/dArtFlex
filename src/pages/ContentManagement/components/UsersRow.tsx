import React, { useState } from 'react'
import { IUsersRow } from '../types'
import { StyledTableRow, useStyles } from '../styles'
import { Box, Button, TableCell } from '@material-ui/core'

interface IUsersRowInterface {
  row: IUsersRow
}

export default function UsersRow(props: IUsersRowInterface) {
  const [isBanned, setIsBanned] = useState(props.row.isActive)
  const handleStatusChange = () => {
    setIsBanned((prevState) => !prevState)
  }

  const classes = useStyles()

  return (
    <StyledTableRow key={props.row.id}>
      <TableCell>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundImage: `url(${props.row.avatar})` }} className={classes.userAvatar} />
          <Box className={classes.tableTextItem}>
            {props.row.firstname} {props.row.lastname}
          </Box>
        </Box>
      </TableCell>
      <TableCell classes={{ root: classes.tableTextItem }}>@{props.row.username}</TableCell>
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
