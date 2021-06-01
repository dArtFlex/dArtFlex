import { TablePaginationProps } from '@material-ui/core'

export interface ITableProps {
  // eslint-disable-next-line
  data: any
  // eslint-disable-next-line
  columns: any
  meta?: {
    page: number
    results: number
    limit: number
    sortOrder: {
      s: null | string
      d: null | string
    }
  }
  tableInstance?: {}
  loading?: boolean
  controls?: {}
  handleClick?: Function
  handleSelect?: Function
  handleSelectAllClick?: Function
  handleChangePage?: TablePaginationProps['onChangePage']
  handleChangeRowsPerPage?: TablePaginationProps['onChangeRowsPerPage']
  withPagination?: boolean
}
