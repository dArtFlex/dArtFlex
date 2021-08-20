import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersListRequest } from 'stores/reducers/management'
import { selectManagement } from 'stores/selectors'
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../common/icons'
import { useStyles } from '../styles'
import UsersRow from './UsersRow'
import UserRowSkeleton from './UserRowSkeleton'
import clsx from 'clsx'
import { UserDataTypes } from 'types'
import { useFilterByUser } from '../lib'
import { creatArrayFromNumber } from 'utils'

export default function ContentManagementUsers({ search }: { search: string }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { users, fetching } = useSelector(selectManagement())

  useEffect(() => {
    dispatch(getAllUsersListRequest())
  }, [])

  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const handleNextPage = () => setPage(page + 1)
  const handlePreviousPage = () => setPage(page - 1)

  const usersByFilter = useFilterByUser(users, search)
  const usersContent = useUsersComposeData(usersByFilter)

  const worksHeaders = ['Name', 'Username', 'Status', '']

  return (
    <Box mt={5}>
      <TableContainer component={Paper} elevation={3}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {worksHeaders.map((item, index) => {
                return (
                  <TableCell key={index} className={classes.tableHeadCell}>
                    {item}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {fetching
              ? creatArrayFromNumber(10).map((e, i) => <UserRowSkeleton key={i} />)
              : usersContent.slice((page - 1) * 10, page * 10).map((item, index) => {
                  return <UsersRow row={item} key={index} />
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={clsx(classes.flexBox, classes.paginationContent)} mt={4}>
        <Paper elevation={3} className={classes.paginationWrapper}>
          <Box className={classes.flexBox}>
            <IconButton onClick={handlePreviousPage} disabled={page === 1} className={classes.disabledButton}>
              <ArrowLeftIcon />
            </IconButton>
            <span className={classes.paginationText}>
              {page} / {Math.ceil(usersContent.length / rowsPerPage)}
            </span>
            <IconButton
              onClick={handleNextPage}
              disabled={page === usersContent.length / rowsPerPage}
              className={classes.disabledButton}
            >
              <ArrowRightIcon className={classes.arrowRight} />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

function useUsersComposeData(users: UserDataTypes[]) {
  return users.map((u) => ({
    id: u.id,
    firstname: u.fullname,
    lastname: '',
    username: u.userid,
    isActive: !u.ban,
    avatar: u.profile_image,
  }))
}
