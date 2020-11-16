import { combineReducers, Reducer } from 'redux'
import common from './common'
import auth from './auth'
import { CommonState } from './common/state'
import { AuthState } from './auth/state'

export interface RootState {
  common: CommonState
  auth: AuthState
}

const rootState: Reducer<RootState> = combineReducers({
  common,
  auth,
})

export default rootState
