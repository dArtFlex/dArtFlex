import React from 'react'
import { useDispatch } from 'react-redux'
import { banWorkRequest, unbanWorkRequest } from 'stores/reducers/management'
import { Box, Button, TableCell } from '@material-ui/core'
import { IWorksRow } from '../types'
import { StyledTableRow, useStyles } from '../styles'
import clsx from 'clsx'
import { shortCutName } from '../../../utils'

interface IWorksRowInterface {
  row: IWorksRow
}

export default function WorksRow(props: IWorksRowInterface) {
  const dispatch = useDispatch()

  const handleBanWork = () => {
    dispatch(banWorkRequest({ item_id: props.row.id }))
  }
  const handleUnbanWork = () => {
    dispatch(unbanWorkRequest({ item_id: props.row.id }))
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
        @{shortCutName(props.row.creator)}
      </TableCell>
      <TableCell classes={{ root: classes.tableTextItem }} className={classes.tableCellRoot}>
        @{shortCutName(props.row.owner)}
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.userStatus)}>
        {props.row.isActive ? (
          <span className={classes.statusTextActive}>Active</span>
        ) : (
          <span className={classes.statusTextBanned}>Banned</span>
        )}
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        {props.row.isActive ? (
          <Button className={clsx(classes.statusTextBanned, classes.worksRowActionButton)} onClick={handleBanWork}>
            Ban
          </Button>
        ) : (
          <Button className={clsx(classes.statusTextUnban, classes.worksRowActionButton)} onClick={handleUnbanWork}>
            Unban
          </Button>
        )}
      </TableCell>
    </StyledTableRow>
  )
}
