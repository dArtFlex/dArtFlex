import { useState, useEffect, useCallback } from 'react'
import { getAssetStatus } from 'utils'
import { AssetMarketplaceTypes, AssetStatus, AssetDataTypes } from 'types'

const useExtendedStatuses = (assets: AssetDataTypes[]): AssetDataTypes[] => {
  const [assetList, setAssetList] = useState<AssetDataTypes[] | []>([])

  const addStatuses = useCallback(() => {
    if (assets) {
      console.log(assets)
    }
  }, [assets])

  useEffect(() => {
    addStatuses()
  }, [addStatuses])

  return assetList
}

export default useExtendedStatuses
