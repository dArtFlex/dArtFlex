import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Box, Typography, FormControl, Select as MUISelect } from '@material-ui/core'
import { PageWrapper, Select } from 'common'
import { TradingHistoryTable, Filter } from './components'
import { useStyles } from './styles'
import { ITradingHistory } from './types'

const sortItems = [
  {
    label: 'Date: Recent',
    value: 'recent',
  },
]

const TRADING_DATA: ITradingHistory[] = [
  {
    action: 'Owned',
    token: {
      tokenId: uuidv4(),
      name: 'Why Does Love',
      image: 'https://picsum.photos/100/100',
    },
    from: '@sarah1224',
    to: '',
    date: '18 Apr 2021, 13:44',
    amount: '0.1 ETH',
    expDate: '',
    etherscanLink: '',
  },
  {
    action: 'Sold',
    token: {
      tokenId: uuidv4(),
      name: 'Broadleaf Lane',
      image: 'https://picsum.photos/100/100',
    },
    from: 'you',
    to: '@sarah1224',
    date: '17 Apr 2021, 13:44',
    amount: '0.023 ETH',
    expDate: '',
    etherscanLink: '',
  },
  {
    action: 'Transferred',
    token: {
      tokenId: uuidv4(),
      name: 'Over Indulgenc',
      image: 'https://picsum.photos/100/100',
    },
    from: 'you',
    to: '@sarah1224',
    date: '16 Apr 2021, 13:44',
    amount: '0.0666 ETH',
    expDate: '',
    etherscanLink: '',
  },
  {
    action: 'Canceled bid',
    token: {
      tokenId: uuidv4(),
      name: 'Why Does Love',
      image: 'https://picsum.photos/100/100',
    },
    from: '@sarah1224',
    to: '',
    date: '15 Apr 2021, 13:44',
    amount: '12 ETH',
    expDate: '',
    etherscanLink: '',
  },
  {
    action: 'Bid Placed',
    token: {
      tokenId: uuidv4(),
      name: 'Broadleaf Lane',
      image: 'https://picsum.photos/100/100',
    },
    from: '@sarah1224',
    to: '',
    date: '13 Apr 2021, 13:44',
    amount: '0.02 ETH',
    expDate: 'In 5 days',
    cancelBid: () => console.log('Cancel Bid'),
    etherscanLink: '',
  },
  {
    action: 'Listed',
    token: {
      tokenId: uuidv4(),
      name: 'Over Indulgenc',
      image: 'https://picsum.photos/100/100',
    },
    from: 'you',
    to: '',
    date: '12 Apr 2021, 13:44',
    amount: '0.022 ETH',
    expDate: '',
    etherscanLink: '',
  },
  {
    action: 'Minted',
    token: {
      tokenId: uuidv4(),
      name: 'Over Indulgenc',
      image: 'https://picsum.photos/100/100',
    },
    from: 'you',
    to: '',
    date: '12 Apr 2021, 13:44',
    amount: '-',
    expDate: '',
    etherscanLink: '',
  },
]

export default function TradingHistory() {
  const classes = useStyles()
  const [sortValue, setSortValue] = useState('recent')

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Trading History
        </Typography>
        <Box mt={6} mb={4}>
          <Box className={classes.filterContainer}>
            <Filter />

            <FormControl variant="outlined" color={'primary'}>
              <MUISelect
                style={{ minWidth: '148px' }}
                value={sortValue}
                defaultValue={'Filter By'}
                className={classes.selectBackgroundColor}
                onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
                  setSortValue(target.value as string)
                }}
              >
                <Typography variant={'body1'} color={'textSecondary'} className={classes.menuTitle}>
                  Sort by:
                </Typography>
                {sortItems.map(({ label, value }) => (
                  <Select key={value} value={value}>
                    {label}
                  </Select>
                ))}
              </MUISelect>
            </FormControl>
          </Box>
        </Box>
        <TradingHistoryTable data={TRADING_DATA} />
      </Box>
    </PageWrapper>
  )
}
