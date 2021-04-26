import { reducer as userReducer } from './user'
import { reducer as assetsReducer } from './assets'
import { reducer as walletReducer } from './wallet'
import { reducer as auctionReducer } from './auction'
import { UserStateType } from './user/types'
import { AssetsStateType } from './assets/types'
import { WalletsStateType } from './wallet/types'
import { AuctionType } from './auction/types'

const rootReducer = {
  user: userReducer,
  assets: assetsReducer,
  wallet: walletReducer,
  auction: auctionReducer,
}

export interface stateType {
  user: UserStateType
  assets: AssetsStateType
  wallet: WalletsStateType
  auction: AuctionType
}

export default rootReducer
