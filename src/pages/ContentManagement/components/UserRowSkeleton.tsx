import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { TableCell, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { StyledTableRow, useStyles } from '../styles'

const useRootStyles = makeStyles(() =>
  createStyles({
    imageEl: {
      width: 52,
      height: 40,
    },
    sectionEl: {
      height: 83,
    },
    btnEl: {
      width: 80,
      height: 28,
    },
    textEl: {
      width: 100,
    },
    flexBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 12,
    },
  })
)

export default function UserRowSkeleton() {
  const classes = useStyles()
  const classesRoot = useRootStyles()
  return (
    <StyledTableRow>
      <TableCell>
        <Box className={classesRoot.flexBox}>
          <Skeleton variant="rect" className={classesRoot.imageEl} />
          <Skeleton variant="text" className={classesRoot.textEl} />
        </Box>
      </TableCell>
      <TableCell classes={{ root: classes.tableTextItem }}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.userStatus)}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rect" className={classesRoot.btnEl} />
      </TableCell>
    </StyledTableRow>
  )
}
