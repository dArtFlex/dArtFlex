import { ITableProps } from '../../types'

export interface IPagination {
  count: number
  rowsPerPage: number
  page: number
  onChangePage: ITableProps['handleChangePage']
}
