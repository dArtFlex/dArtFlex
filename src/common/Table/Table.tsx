import React from 'react'
import {
  Paper,
  Box,
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { Empty, TableHead, Pagination } from './components'
import { ITableProps } from './types'
import { useStyles } from './styles'

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50]

export default function Table(props: ITableProps) {
  const {
    tableInstance,
    meta,
    loading,
    handleClick,
    handleSelect,
    handleSelectAllClick,
    handleChangePage = () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    handleChangeRowsPerPage = () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    controls,
    columns,
    data,
    withPagination = false,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <Paper className={classes.container}>
      {loading && (
        <Box className={classes.tableLoader}>
          <CircularProgressLoader />
        </Box>
      )}
      {!loading && data && !data.length && <Empty />}

      <TableContainer className={classes.tableContainer}>
        <MUITable className={classes.table} aria-labelledby="tableTitle" size={'medium'} stickyHeader>
          <TableHead
            onSelectAllClick={handleSelectAllClick}
            headCells={columns}
            meta={meta}
            controls={controls}
            {...tableInstance}
            {...rest}
          />

          <TableBody>
            {loading
              ? null
              : data.map((
                  row: any // eslint-disable-line @typescript-eslint/no-explicit-any
                ) => (
                  <TableRow
                    classes={{ root: classes.tableRowRoot }}
                    hover
                    role="checkbox"
                    aria-checked={row._id}
                    key={row._id}
                    tabIndex={-1}
                    onClick={() => {
                      handleSelect !== undefined && handleSelect(row._id, row)
                      handleClick !== undefined && handleClick(row._id, row)
                    }}
                  >
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      columns.map((cell: any) => {
                        return (
                          <TableCell
                            className={classes.tableCell}
                            key={cell.accessor + '-' + row._id}
                            style={cell.style}
                          >
                            {typeof cell.render === 'function' ? cell.render(row) : row[cell.accessor]}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      {withPagination && (
        <TablePagination
          page={meta?.page || 0}
          count={meta?.results || 0}
          rowsPerPage={meta?.limit || DEFAULT_ROWS_PER_PAGE_OPTIONS[0]}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={Pagination}
          className={classes.tablePagination}
          labelRowsPerPage={'Pages'}
          rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
          component="div"
        />
      )}
    </Paper>
  )
}
