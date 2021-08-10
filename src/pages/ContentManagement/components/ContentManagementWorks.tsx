import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllWorksRequest } from 'stores/reducers/management'
import { ManagementStateType } from 'stores/reducers/management/types'
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
import WorksRow from './WorksRow'
import { useStyles } from '../styles'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../common/icons'
import clsx from 'clsx'
import { useFilterByWorks } from '../lib'

export default function ContentManagementWorks({ search }: { search: string }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { works } = useSelector(selectManagement())

  useEffect(() => {
    dispatch(getAllWorksRequest())
  }, [])

  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 10
  const handleNextPage = () => setPage(page + 1)
  const handlePreviousPage = () => setPage(page - 1)

  const worksByFilter = useFilterByWorks(works, search)
  const worksContent = useWorksComposeData(worksByFilter)

  const worksHeaders = ['Artwork Name', 'Creator', 'Owner', 'Status', '']

  return (
    <Box mt={5}>
      <TableContainer component={Paper} elevation={3}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {worksHeaders.map((item, index) => {
                return (
                  <TableCell key={index} className={clsx(classes.tableHeadCell, classes.tableCellRoot)}>
                    {item}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {worksContent.slice((page - 1) * 10, page * 10).map((item, index) => {
              return <WorksRow row={item} key={index} />
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
              {page} / {worksContent.length / rowsPerPage}
            </span>
            <IconButton
              onClick={handleNextPage}
              disabled={page === worksContent.length / rowsPerPage}
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

function useWorksComposeData(works: ManagementStateType['works']) {
  return works.map((as) => ({
    id: as.id,
    name: as.imageData.name,
    creator: as.creatorData.userid,
    owner: as.ownerData.userid,
    isActive: !as.ban,
    pictureURL: as.imageData.image,
  }))
}
