import { IBiddedOfferedAsset } from '../../stores/reducers/user/types'
import { AssetDataTypesWithStatus } from '../../types'

export function useComposeAssetsData(assetData: IBiddedOfferedAsset[], userAssets: AssetDataTypesWithStatus[]) {
  return userAssets.map((a) => {
    const assetSalesData = assetData.find((item) => a.tokenData?.id === item.id)
    a = {
      ...a,
      highest_bid: assetSalesData && assetSalesData.highest_bid,
      highest_offer: assetSalesData && assetSalesData.highest_offer,
      marketplace: assetSalesData && assetSalesData.marketplace,
    }
    return a
  })
}
