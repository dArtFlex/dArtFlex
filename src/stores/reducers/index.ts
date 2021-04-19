import { reducer as userReducer } from './user'
import { reducer as assetsReducer } from './assets'
import { UserStateType } from './user/types'
import { AssetsStateType } from './assets/types'

const rootReducer = {
  user: userReducer,
  assets: assetsReducer,
}

export interface stateType {
  user: UserStateType
  assets: AssetsStateType
}

export default rootReducer
