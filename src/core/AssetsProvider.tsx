import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAssetsAllRequest } from 'stores/reducers/assets'
import { CircularProgressLoader } from 'common'

export const AssetsProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    function setWallets() {
      dispatch(getAssetsAllRequest())
      setReady(true)
    }

    setWallets()
  }, [])

  return ready ? <>{children}</> : <CircularProgressLoader height="fullScreen" />
}
