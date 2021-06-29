import React, { useState } from 'react'
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

export default function ContentManagementUsers() {
  const classes = useStyles()

  const [page, setPage] = useState(1)

  const rowsPerPage = 10

  const handleNextPage = () => setPage(page + 1)

  const handlePreviousPage = () => setPage(page - 1)

  const usersContent = [
    {
      id: 1,
      firstname: 'Gustavo',
      lastname: 'Philips',
      username: '435345ff',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 2,
      firstname: 'Jaylon',
      lastname: 'Dokidis',
      username: 'sarah1224',
      isActive: false,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 3,
      firstname: 'Marilyn',
      lastname: 'Septimus',
      username: 'johndou',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 4,
      firstname: 'Kianna',
      lastname: 'Septimus',
      username: 'johnconnor',
      isActive: true,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 5,
      firstname: 'Adison',
      lastname: 'Septimus',
      username: 'sarah1224',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 6,
      firstname: 'Livia',
      lastname: 'Bergson',
      username: 'johnconnor',
      isActive: true,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 7,
      firstname: 'Jocelyn',
      lastname: 'Aminoff',
      username: 'sarah1224',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 8,
      firstname: 'Gustavo',
      lastname: 'Philips',
      username: '435345ff',
      isActive: true,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 9,
      firstname: 'Jaylon',
      lastname: 'Dokidis',
      username: 'sarah1224',
      isActive: false,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 10,
      firstname: 'Marilyn',
      lastname: 'Septimus',
      username: 'johndou',
      isActive: true,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 11,
      firstname: 'Gustavo',
      lastname: 'Philips',
      username: '435345ff',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 12,
      firstname: 'Jaylon',
      lastname: 'Dokidis',
      username: 'sarah1224',
      isActive: false,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 13,
      firstname: 'Marilyn',
      lastname: 'Septimus',
      username: 'johndou',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 14,
      firstname: 'Kianna',
      lastname: 'Septimus',
      username: 'johnconnor',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 15,
      firstname: 'Adison',
      lastname: 'Septimus',
      username: 'sarah1224',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 16,
      firstname: 'Livia',
      lastname: 'Bergson',
      username: 'johnconnor',
      isActive: true,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 17,
      firstname: 'Jocelyn',
      lastname: 'Aminoff',
      username: 'sarah1224',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 18,
      firstname: 'Gustavo',
      lastname: 'Philips',
      username: '435345ff',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
    {
      id: 19,
      firstname: 'Jaylon',
      lastname: 'Dokidis',
      username: 'sarah1224',
      isActive: false,
      avatar: 'https://jooinn.com/images/photo-of-woman-11.jpg',
    },
    {
      id: 20,
      firstname: 'Marilyn',
      lastname: 'Septimus',
      username: 'johndou',
      isActive: true,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
    },
  ]

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
            {usersContent.slice((page - 1) * 10, page * 10).map((item, index) => {
              return <UsersRow row={item} key={index} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.flexBox} mt={4}>
        <Paper elevation={3} className={classes.paginationWrapper}>
          <Box className={classes.flexBox}>
            <IconButton onClick={handlePreviousPage} disabled={page === 1} className={classes.disabledButton}>
              <ArrowLeftIcon />
            </IconButton>
            <span className={classes.paginationText}>
              {page} / {usersContent.length / rowsPerPage}
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
