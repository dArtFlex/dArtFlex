import { ITableProps } from '../../types'

export interface ITableHead extends Pick<ITableProps, 'controls' | 'meta'> {
  onSelectAllClick: ITableProps['handleSelectAllClick']
  headCells: {
    accessor: string
    header: string
  }[]
}
