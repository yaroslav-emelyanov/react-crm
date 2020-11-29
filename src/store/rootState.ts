import { combineReducers, Reducer } from 'redux'
import common from './common'
import info from './info'
import { CommonState } from './common/state'
import { InfoState } from './info/state'

export interface RootState {
  common: CommonState
  info: InfoState
}

const rootState: Reducer<RootState> = combineReducers({
  common,
  info,
})

export default rootState
