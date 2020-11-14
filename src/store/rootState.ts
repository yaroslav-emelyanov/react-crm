import { combineReducers, Reducer } from 'redux'
import common from './common'
import { CommonState } from './common/state'

export interface RootState {
  common: CommonState
}

const rootState: Reducer<RootState> = combineReducers({
  common,
})

export default rootState
