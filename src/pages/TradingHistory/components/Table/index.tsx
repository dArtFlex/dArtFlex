import React from 'react'
import { Table } from 'common'
import { ITradingHistory } from '../../types'

interface ITradingHistoryTable {
  data: ITradingHistory[]
}

export default function TradingHistoryTable(props: ITradingHistoryTable) {
  const { data } = props

  return <Table columns={useColumns()} data={data} />
}

function useColumns() {
  return [
    {
      accessor: 'action',
      header: 'Action',
      style: { width: '35%', fontWeight: 'bold', color: '#181e27' },
    },
    {
      accessor: 'token',
      header: 'Token',
      render: (cell: ITradingHistory) => {
        return cell.cancelBid ? '' : ''
      },
      style: {
        width: '35%',
        maxWidth: 300,
      },
    },
  ]
}
