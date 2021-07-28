import { reducer as userReducer } from './user'
import { reducer as assetsReducer } from './assets'
import { reducer as walletReducer } from './wallet'
import { reducer as mintingReducer } from './minting'
import { reducer as listingReducer } from './listing'
import { reducer as placeBidReducer } from './placeBid'
import { reducer as buyNowReducer } from './buyNow'
import { UserStateType } from './user/types'
import { AssetsStateType } from './assets/types'
import { WalletsStateType } from './wallet/types'
import { MintingStateType } from './minting/types'
import { ListingStateType } from './listing/types'
import { PlaceBidStateType } from './placeBid/types'
import { BuyNowStateType } from './buyNow/types'

const rootReducer = {
  user: userReducer,
  assets: assetsReducer,
  wallet: walletReducer,
  minting: mintingReducer,
  listing: listingReducer,
  bid: placeBidReducer,
  buy: buyNowReducer,
}

export interface stateType {
  user: UserStateType
  assets: AssetsStateType
  wallet: WalletsStateType
  minting: MintingStateType
  listing: ListingStateType
  bid: PlaceBidStateType
  buy: BuyNowStateType
}

export default rootReducer
