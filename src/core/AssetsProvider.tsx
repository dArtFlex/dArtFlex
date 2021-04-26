import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAssetsRequest } from 'stores/reducers/assets'
import { CircularProgressLoader } from 'common'

export const AssetsProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    function setWallets() {
      dispatch(getAssetsRequest())
      setReady(true)
    }

    setWallets()
  }, [])

  return ready ? <>{children}</> : <CircularProgressLoader height="fullScreen" />
}
