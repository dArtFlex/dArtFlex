import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectWallet } from 'stores/selectors'
import { getAssetsAllRequest } from 'stores/reducers/assets'
import { getUserDataRequest } from 'stores/reducers/user'
import { CircularProgressLoader } from 'common'
import appConst from 'config/consts'

const { INTERVALS } = appConst

export const DataProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const { wallet } = useSelector(selectWallet())

  const fetchAssets = () => {
    dispatch(getAssetsAllRequest())
  }

  const fetchUser = useCallback(() => {
    dispatch(getUserDataRequest({ wallet: wallet?.accounts[0] }))
  }, [wallet?.accounts[0]])

  useEffect(() => {
    fetchAssets()

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
