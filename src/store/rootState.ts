import { combineReducers, Reducer } from 'redux'
import common from './common'
import auth from './auth'
import info from './info'
import { CommonState } from './common/state'
import { AuthState } from './auth/state'
import { InfoState } from './info/state'

export interface RootState {
  common: CommonState
  auth: AuthState
  info: InfoState
}

const rootState: Reducer<RootState> = combineReducers({
  common,
  auth,
  info,
})

export default rootState
