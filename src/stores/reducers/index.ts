import { reducer as userReducer } from './user'
import { UserStateType } from './user/types'

const rootReducer = {
  user: userReducer,
}

export interface stateType {
  user: UserStateType
}

export default rootReducer
