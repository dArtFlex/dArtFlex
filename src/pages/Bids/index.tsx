import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, CircularProgressLoader } from 'common'
import { CardBid } from './components'
import BidDetails from './BidDetails'
import { getUserBidsRequest } from 'stores/reducers/user'
import { selectUser, selectAssetTokenRates } from 'stores/selectors'
import { useStyles } from './styles'
import appConsts from 'config/consts'

import routes from 'routes'
import { useComposeBidsData } from './lib'

const { INTERVALS } = appConsts

export default function TradingHistory() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { user, userBids, fetchingBids } = useSelector(selectUser())

  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const rateETH = exchangeRates ? exchangeRates[0].rateUsd : 0

  const composeUserBidsData = useComposeBidsData({ userBids, userId: user?.id || 0, rateETH })

  const fetchUserBids = () => {
    dispatch(getUserBidsRequest())
  }

  useEffect(() => {
    if (!user) {
      return
    }
    fetchUserBids()
    const iId = setInterval(() => fetchUserBids(), INTERVALS.UPDATE_BIDS_HISTORY)
    return () => {
      clearInterval(iId)
    }
  }, [])

  if (!user) {
    history.push(routes.home)
    return null
  }

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Bids
        </Typography>
        {fetchingBids && userBids.length === 0 ? (
          <CircularProgressLoader />
        ) : (
          <Box className={classes.cardBidContainer}>
            {composeUserBidsData.map((bid, i) => (
              <CardBid key={i} bid={bid} />
            ))}
          </Box>
        )}
      </Box>
    </PageWrapper>
  )
}

export { BidDetails }
