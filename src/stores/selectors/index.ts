import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'

// Assets
export const selectAssets = () =>
  createSelector(
    (store: stateType) => store.assets,
    ({ assets, fetching, fetchingAll }) => ({ assets, fetching, fetchingAll })
  )
export const selectAssetFromList = (id: string) =>
  createSelector(
    (store: stateType) => store.assets.assets,
    (assets) => ({ asset: assets?.find((a) => a.item_id === id) })
  )
export const selectAssetDetails = () =>
  createSelector(
    (store: stateType) => store.assets,
    ({ assetDetails, fetching }) => ({ assetDetails, fetching })
  )
export const selectAssetTokenRates = () =>
  createSelector(
    (store: stateType) => store.assets?.exchangeRates,
    (exchangeRates) => ({ exchangeRates })
  )
export const selectHashtags = () =>
  createSelector(
    (store: stateType) => store.assets?.hashtags,
    (hashtags) => ({ hashtags })
  )
export const selectAssetsMeta = () =>
  createSelector(
    (store: stateType) => store.assets?.meta,
    (meta) => ({ meta })
  )

// User
export const selectUser = () =>
  createSelector(
    (store: stateType) => store.user,
    ({
      user,
      userAssets,
      userCollectedAssets,
      userBids,
      userSoldAssets,
      userCreatedAssets,
      fetching,
      fetchingBids,
      fetchingTrading,
      fetchingAssets,
      fetchingId,
      isId,
      userIdValid,
      error,
      activeBids,
      biddedOfferedAssets,
    }) => ({
      user,
      userAssets,
      userCollectedAssets,
      userSoldAssets,
      userCreatedAssets,
      userBids,
      fetching,
      fetchingBids,
      fetchingTrading,
      fetchingAssets,
      fetchingId,
      isId,
      userIdValid,
      error,
      activeBids,
      biddedOfferedAssets,
    })
  )
export const selectUserRole = () =>
  createSelector(
    (store: stateType) => store.user?.role,
    (role) => ({ role })
  )
export const selectPromotion = () =>
  createSelector(
    (store: stateType) => store.user,
    ({ promotionIds, promotionAssets, fetchingPromo }) => ({
      promotionIds,
      promotionAssets,
      fetchingPromo,
    })
  )
export const selectSearch = () =>
  createSelector(
    (store: stateType) => store.user.search,
    (search) => ({ search })
  )
export const selectAllUsers = () =>
  createSelector(
    (store: stateType) => store.user?.userAll,
    (userAll) => ({ userAll })
  )
export const selectAllTradingHistory = () =>
  createSelector(
    (store: stateType) => store.user.tradingHistoryAll,
    (tradingHistoryAll) => ({ tradingHistoryAll })
  )

export const selectUserSuccessMessage = () =>
  createSelector(
    (store: stateType) => store.user.success,
    (success) => ({ success })
  )

// Wallet
export const selectWallet = () =>
  createSelector(
    (store: stateType) => store.wallet,
    ({ wallet, tokensBalances, chainName }) => ({ wallet, tokensBalances, chainName })
  )
export const selectWalletError = () =>
  createSelector(
    (store: stateType) => store.wallet.error,
    (error) => ({ error })
  )
export const selectWalletChainError = () =>
  createSelector(
    (store: stateType) => store.wallet.chainError,
    (chainError) => ({ chainError })
  )
export const selectWalletChainName = () =>
  createSelector(
    (store: stateType) => store.wallet.chainName,
    (chainName) => ({ chainName })
  )

// Minting
export const selectMinting = () =>
  createSelector(
    (store: stateType) => store.minting,
    (minting) => ({ minting })
  )

// Listing
export const selectListing = () =>
  createSelector(
    (store: stateType) => store.listing,
    (listing) => ({ listing })
  )

// Bid
export const selectBid = () =>
  createSelector(
    (store: stateType) => store.bid,
    (bid) => ({ bid })
  )

// Buy
export const selectBuy = () =>
  createSelector(
    (store: stateType) => store.buy,
    (buy) => ({ buy })
  )

// MakeOffer
export const selectMakeOffer = () =>
  createSelector(
    (store: stateType) => store.offer,
    (offer) => ({ offer })
  )

// Notifications
export const selectNotifications = () =>
  createSelector(
    (store: stateType) => store.notifications.notifications,
    (notifications) => ({ notifications })
  )

// Management
export const selectManagement = () =>
  createSelector(
    (store: stateType) => store.management,
    ({ works, users, error, fetching }) => ({ works, users, error, fetching })
  )

// Constructor
export const selectConstructor = () =>
  createSelector(
    (store: stateType) => store.constructorAI,
    ({ transfer, priority, endScale, error, fetching, imageUrl }) => ({
      transfer,
      priority,
      endScale,
      error,
      fetching,
      imageUrl,
    })
  )

// Album
export const selectAlbum = () =>
  createSelector(
    (store: stateType) => store.album,
    ({ album, fetching, error, success }) => ({
      album,
      fetching,
      error,
      success,
    })
  )

// Chain
export const selectChain = () =>
  createSelector(
    (store: stateType) => store.chain,
    ({ chainId, chainName }) => ({
      chainId,
      chainName,
    })
  )
