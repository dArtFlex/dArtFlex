import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectWallet } from 'stores/selectors'
import { getAssetsAllRequest, getExchangeRateTokensRequest } from 'stores/reducers/assets'
import { getUserDataRequest, getPromotionRequest } from 'stores/reducers/user'
import { getTokensBalancesRequest } from 'stores/reducers/wallet'
import { CircularProgressLoader } from 'common'
import appConst from 'config/consts'

const { INTERVALS } = appConst

export const DataProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const { wallet } = useSelector(selectWallet())

  const fetchAssets = () => {
    dispatch(getAssetsAllRequest())
    dispatch(getExchangeRateTokensRequest())
    dispatch(getPromotionRequest())
  }

  const fetchUser = useCallback(() => {
    if (wallet?.accounts[0]) {
      dispatch(getUserDataRequest({ wallet: wallet?.accounts[0] }))
      dispatch(getTokensBalancesRequest({ wallet: wallet?.accounts[0] }))
    }
  }, [wallet?.accounts[0]])

  useEffect(() => {
    fetchAssets()
    dispatch(getExchangeRateTokensRequest())

    const iId = setInterval(() => fetchAssets(), INTERVALS.UPDATE_ASSETS)
    setReady(true)
    return () => {
      clearInterval(iId)
    }
  }, [])

  useEffect(() => {
    fetchUser()
    return () => {
      fetchUser()
    }
  }, [wallet?.accounts[0]])

  return ready ? <>{children}</> : <CircularProgressLoader height="fullScreen" />
}
