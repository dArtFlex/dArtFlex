import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectAllTradingHistory, selectSearch } from 'stores/selectors'
import { Box, Typography, FormControl, Select as MUISelect } from '@material-ui/core'
import { PageWrapper, Select, CircularProgressLoader } from 'common'
import { TradingHistoryTable, Filter } from './components'
import { getTradingHistoryRequest } from 'stores/reducers/user'
import { useStyles } from './styles'
import { ITradingHistory, IFilterTypes } from './types'
import { useComposeTradingData, useTradingHistoryByFilter, useSearchTradingHistory } from './lib'

const sortItems = [
  {
    label: 'Date: Recent',
    value: 'recent',
  },
]

export default function TradingHistory() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [sortValue, setSortValue] = useState('recent')
  const [filterBy, setFilterBy] = useState<IFilterTypes[]>([])

  const { user, fetchingTrading } = useSelector(selectUser())
  const { tradingHistoryAll } = useSelector(selectAllTradingHistory())
  const { search } = useSelector(selectSearch())

  const tradingHistory: ITradingHistory[] = useComposeTradingData({ tradingHistoryAll })
  const tradingFistoryBySearch: ITradingHistory[] = useSearchTradingHistory({ tradingHistory, search })
  const tradingHistoryByFilter: ITradingHistory[] = useTradingHistoryByFilter({
    tradingHistory: tradingFistoryBySearch,
    filterBy,
  })

  const getTradingHistory = useCallback(
    (id?: number) => {
      dispatch(getTradingHistoryRequest({ userId: id }))
    },
    [user]
  )

  useEffect(() => {
    if (user?.id) {
      getTradingHistory(user.id)
    }
    return () => {
      getTradingHistory()
    }
  }, [user])

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Trading History
        </Typography>
        <Box mt={6} mb={4}>
          <Box className={classes.filterContainer}>
            <Filter onFilter={(filters) => setFilterBy(filters)} />

            <FormControl variant="outlined" color={'primary'} classes={{ root: classes.tradingHistorySelect }}>
              <MUISelect
                style={{ minWidth: '148px' }}
                value={sortValue}
                defaultValue={'Filter By'}
                className={classes.selectBackgroundColor}
                onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
                  setSortValue(target.value as string)
                }}
                MenuProps={{
                  classes: { paper: classes.menuList },
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
        {fetchingTrading ? <CircularProgressLoader /> : <TradingHistoryTable data={tradingHistoryByFilter} />}
      </Box>
    </PageWrapper>
  )
}
