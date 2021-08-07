import { IDashboardArtworksFiltes } from './types'
import { IUserAssets } from './types'
import appConst from 'config/consts'

const {
  STATUSES: { MINTED, LISTED, UNLISTED },
  FILTER_VALUES: { IN_WALLET, CREATED, COLLECTED, SOLD },
} = appConst

export function useSortedAssets({
  userAssets,
  filter,
}: {
  userAssets: IUserAssets[] | null
  filter: IDashboardArtworksFiltes
}) {
  if (!userAssets) {
    return userAssets
  }

  switch (filter) {
    case IN_WALLET:
      return userAssets
    case CREATED:
      return userAssets.filter((a) => a.tokenData.creator === a.tokenData.owner && Boolean(a.sold) === false)
    case COLLECTED:
      return userAssets.map((a: IUserAssets) => {
        return a.status === SOLD || a.status === LISTED
          ? { ...a, status: COLLECTED }
          : a.status === MINTED
          ? { ...a, status: UNLISTED }
          : a
      })
    case SOLD:
      return userAssets.filter((a) => Boolean(a.sold))
    default:
      throw new Error(`Insufficient type: ${filter}`)
  }
}
