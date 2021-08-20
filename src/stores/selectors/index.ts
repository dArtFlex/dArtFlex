import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'

// Assets
export const selectAssets = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets, fetching, fetchingAll } }: stateType) => ({ assets, fetching, fetchingAll })
  )
export const selectAssetFromList = (id: string) =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets } }: stateType) => ({ asset: assets?.find((a) => a.item_id === id) })
  )
export const selectAssetDetails = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assetDetails, fetching } }: stateType) => ({ assetDetails, fetching })
  )
export const selectAssetTokenRates = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { exchangeRates } }: stateType) => ({ exchangeRates })
  )
export const selectHashtags = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { hashtags } }: stateType) => ({ hashtags })
  )

// User
export const selectUser = () =>
  createSelector(
    (store: stateType) => store,
    ({
      user: {
        user,
        userAssets,
        userCollectedAssets,
        userBids,
        userSolddAssets,
        fetching,
        fetchingBids,
        isId,
        fetchingId,
        userIdValid,
        error,
        activeBids,
      },
    }: stateType) => ({
      user,
      userAssets,
      userCollectedAssets,
      userSolddAssets,
      userBids,
      fetching,
      fetchingBids,
      isId,
      fetchingId,
      userIdValid,
      error,
      activeBids,
    })
  )
export const selectUserRole = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { role } }: stateType) => ({ role })
  )
export const selectPromotion = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { promotionIds, promotionAssets } }: stateType) => ({ promotionIds, promotionAssets })
  )
export const selectSearch = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { search } }: stateType) => ({ search })
  )
export const selectAllUsers = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { userAll } }: stateType) => ({ userAll })
  )
export const selectAllTradingHistory = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { tradingHistoryAll } }: stateType) => ({ tradingHistoryAll })
  )

export const selectUserSuccessMessage = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { success } }: stateType) => ({ success })
  )

// Wallet
export const selectWallet = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { wallet, tokensBalances } }: stateType) => ({ wallet, tokensBalances })
  )
export const selectWalletError = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { error } }: stateType) => ({ error })
  )

// Minting
export const selectMinting = () =>
  createSelector(
    (store: stateType) => store,
    ({ minting }: stateType) => ({ minting })
  )

// Listing
export const selectListing = () =>
  createSelector(
    (store: stateType) => store,
    ({ listing }: stateType) => ({ listing })
  )

// Bid
export const selectBid = () =>
  createSelector(
    (store: stateType) => store,
    ({ bid }: stateType) => ({ bid })
  )

// Buy
export const selectBuy = () =>
  createSelector(
    (store: stateType) => store,
    ({ buy }: stateType) => ({ buy })
  )

// MakeOffer
export const selectMakeOffer = () =>
  createSelector(
    (store: stateType) => store,
    ({ offer }: stateType) => ({ offer })
  )

// Notifications
export const selectNotifications = () =>
  createSelector(
    (store: stateType) => store,
    ({ notifications: { notifications } }: stateType) => ({ notifications })
  )

// Management
export const selectManagement = () =>
  createSelector(
    (store: stateType) => store,
    ({ management: { works, users, error, fetching } }: stateType) => ({ works, users, error, fetching })
  )
