import { reducerFactory, updateState } from '../../utils/functions'
import { CommonState, commonState } from './state'
import { Handlers } from '../../utils/interfaces'
import { OPEN_SIDEBAR, SET_ERROR } from './constants'

interface CommonHandlers<S = CommonState> {
  [OPEN_SIDEBAR]: (state: S) => S
  [SET_ERROR]: (state: S, payload: string) => S
}

const handlers: CommonHandlers & Handlers<CommonState> = {
  [OPEN_SIDEBAR]: (state) => {
    return updateState(state, { openSidebar: !state.openSidebar })
  },
  [SET_ERROR]: (state, error) => {
    return updateState(state, { error })
  },
}

export default reducerFactory(commonState, handlers)

export type CommonAction = {
  type: keyof CommonHandlers
  payload?: Parameters<CommonHandlers[keyof CommonHandlers]>[1]
}
