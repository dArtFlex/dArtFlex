import { IDashboardArtworksFiltes } from './types'
import { IUserAssets } from './types'
import appConst from 'config/consts'

const {
  STATUSES: { LISTED },
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
      return userAssets.map((a: IUserAssets) => {
        return a.status === SOLD ? { ...a, status: COLLECTED } : a
      })
    case CREATED:
      return userAssets
    case COLLECTED:
      return userAssets.map((a: IUserAssets) => {
        return a.status === SOLD || a.status === LISTED ? { ...a, status: COLLECTED, _status: a.status } : a
      })
    case SOLD:
      return userAssets.map((a: IUserAssets) => ({ ...a, status: SOLD }))
    default:
      throw new Error(`Insufficient type: ${filter}`)
  }
}
