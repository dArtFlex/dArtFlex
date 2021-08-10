import React from 'react'
import { useDispatch } from 'react-redux'
import { banUserRequest, unbanUserRequest } from 'stores/reducers/management'
import { IUsersRow } from '../types'
import { StyledTableRow, useStyles } from '../styles'
import { Box, Button, TableCell } from '@material-ui/core'
import clsx from 'clsx'

interface IUsersRowInterface {
  row: IUsersRow
}

export default function UsersRow(props: IUsersRowInterface) {
  const dispatch = useDispatch()
  const handleBanUser = () => {
    dispatch(banUserRequest({ user_id: props.row.id }))
  }
  const handleUnbanUser = () => {
    dispatch(unbanUserRequest({ user_id: props.row.id }))
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
      <TableCell className={clsx(classes.tableCellRoot, classes.userStatus)}>
        {props.row.isActive ? (
          <span className={classes.statusTextActive}>Active</span>
        ) : (
          <span className={classes.statusTextBanned}>Banned</span>
        )}
      </TableCell>
      <TableCell>
        {props.row.isActive ? (
          <Button className={clsx(classes.statusTextBanned, classes.worksRowActionButton)} onClick={handleBanUser}>
            Ban
          </Button>
        ) : (
          <Button className={clsx(classes.statusTextUnban, classes.worksRowActionButton)} onClick={handleUnbanUser}>
            Unban
          </Button>
        )}
      </TableCell>
    </StyledTableRow>
  )
}
