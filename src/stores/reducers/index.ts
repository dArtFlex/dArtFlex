import { reducer as userReducer } from './user'
import { reducer as assetsReducer } from './assets'
import { reducer as walletReducer } from './wallet'
import { reducer as mintingReducer } from './minting'
import { reducer as listingReducer } from './listing'
import { reducer as placeBidReducer } from './placeBid'
import { UserStateType } from './user/types'
import { AssetsStateType } from './assets/types'
import { WalletsStateType } from './wallet/types'
import { MintingStateType } from './minting/types'
import { ListingStateType } from './listing/types'
import { PlaceBidStateType } from './placeBid/types'

const rootReducer = {
  user: userReducer,
  assets: assetsReducer,
  wallet: walletReducer,
  minting: mintingReducer,
  listing: listingReducer,
  bid: placeBidReducer,
}

export interface stateType {
  user: UserStateType
  assets: AssetsStateType
  wallet: WalletsStateType
  minting: MintingStateType
  listing: ListingStateType
  bid: PlaceBidStateType
}

export default rootReducer
