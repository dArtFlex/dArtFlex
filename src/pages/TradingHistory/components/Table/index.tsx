import React from 'react'
import BigNumber from 'bignumber.js'
import { Box, IconButton, Link, Button, Typography } from '@material-ui/core'
import { Table, Image } from 'common'
import { ExternalLinkIcon } from 'common/icons'
import { ITradingHistory } from '../../types'
import { ITradingHistoryTable } from './types'
import { shortCutName, tabelTimeFormat } from 'utils'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import routes from '../../../../routes'

export default function TradingHistoryTable(props: ITradingHistoryTable) {
  const { data } = props

  return <Table columns={useColumns()} data={data} />
}

function useColumns() {
  const classes = useStyles()
  const history = useHistory()

  return [
    {
      accessor: 'action',
      header: 'Action',
    },
    {
      accessor: 'token',
      header: 'Token',
      // eslint-disable-next-line react/display-name
      render: (cell: ITradingHistory) => {
        return (
          <Box className={classes.imageBox} onClick={() => history.push(`${routes.artworks}/${cell.item_id}`)}>
            <Image src={cell.token.image} className={classes.image} />
            <Link href={'#'} underline={'none'}>
              {cell.token.name}
            </Link>
          </Box>
        )
      },
    },
    {
      accessor: 'from',
      header: 'From',
      // eslint-disable-next-line react/display-name
      render: (cell: ITradingHistory) => (
        <Typography color={'primary'} className={classes.textLight}>
          {'@' + shortCutName(cell.from)}
        </Typography>
      ),
    },
    {
      accessor: 'to',
      header: 'To',
      // eslint-disable-next-line react/display-name
      render: (cell: ITradingHistory) => {
        return cell.to.length ? (
          <Typography color={'primary'} className={classes.textLight}>
            {'@' + shortCutName(cell.to)}
          </Typography>
        ) : (
          '-'
        )
      },
    },
    {
      accessor: 'date',
      header: 'Date and time',
      render: (cell: ITradingHistory) => {
        return cell.date.length ? tabelTimeFormat(cell.date) : '-'
      },
    },
    {
      accessor: 'amount',
      header: 'Amount',
      render: (cell: ITradingHistory) => {
        return new BigNumber(cell.amount).dividedBy(`10e${18 - 1}`).toNumber() + ' ETH'
      },
    },
    {
      accessor: 'expDate',
      header: 'Expiration',
      // eslint-disable-next-line react/display-name
      render: (cell: ITradingHistory) => {
        return cell.expDate.length ? cell.expDate : '-'
      },
    },
    {
      accessor: 'cancelBid',
      header: '',
      // eslint-disable-next-line react/display-name
      render: (cell: ITradingHistory) => {
        return cell.cancelBid ? (
          <Button variant={'outlined'} className={classes.btnCancelBid}>
            Cancel Bid
          </Button>
        ) : (
          ''
        )
      },
    },
    {
      accessor: 'etherscanLink',
      header: '',
      // eslint-disable-next-line react/display-name
      render: (cell: ITradingHistory) => {
        return (
          <>
            {cell.txHash ? (
              <IconButton href={cell.etherscanLink}>
                <ExternalLinkIcon className={classes.btnLink} />
              </IconButton>
            ) : (
              <Box />
            )}
          </>
        )
      },
    },
  ]
}
