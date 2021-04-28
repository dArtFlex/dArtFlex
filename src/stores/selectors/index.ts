import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'

// Assets
export const selectAssets = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets, fetching } }: stateType) => ({ assets, fetching })
  )

export const selectAsset = (id: string) =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets } }: stateType) => ({ asset: assets?.find((a) => a.tokenId === id) })
  )

// User
export const selectUser = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { user } }: stateType) => ({ user })
  )

// Wallet
export const selectWallet = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { wallet } }: stateType) => ({ wallet })
  )
