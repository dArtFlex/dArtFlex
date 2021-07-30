import { IDashboardArtworksFiltes } from './types'
import { IUserAssets } from './types'
import appConst from 'config/consts'

const {
  FILTER_VALUES: { IN_WALLET, CREATED, COLLECTED, SOLD },
} = appConst

export function useSortedAssets({
  userAssets,
  filter,
}: {
  userAssets: IUserAssets[] | []
  filter: IDashboardArtworksFiltes
}) {
  if (userAssets.length == 0) {
    return userAssets
  }

  switch (filter) {
    case IN_WALLET:
      return userAssets
    case CREATED:
      return userAssets.filter((a) => a.tokenData.creator === a.tokenData.owner && Boolean(a.sold) === false)
    case COLLECTED:
      return userAssets.filter((a) => a.tokenData.creator !== a.tokenData.owner && Boolean(a.sold) === false)
    case SOLD:
      return userAssets.filter((a) => Boolean(a.sold))
    default:
      throw new Error(`Insufficient type: ${filter}`)
  }
}
