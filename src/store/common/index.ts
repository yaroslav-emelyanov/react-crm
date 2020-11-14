import { reducerFactory, updateState } from '../../utils/functions'
import { OPEN_SIDEBAR } from './constants'
import { CommonState, commonState } from './state'
import { Handlers } from '../../utils/interfaces'
import { Action } from 'redux'

interface CommonHandlers<S = CommonState> {
  [OPEN_SIDEBAR]: (state: S, payload: undefined) => S
}

const handlers: CommonHandlers & Handlers<CommonState> = {
  [OPEN_SIDEBAR]: (state) => {
    return updateState(state, { openSidebar: !state.openSidebar })
  },
}

export default reducerFactory(commonState, handlers)

export type CommonAction = Parameters<
  CommonHandlers[keyof CommonHandlers]
>[1] extends undefined
  ? Action<keyof CommonHandlers>
  : Action<keyof CommonHandlers> & {
      payload: Parameters<CommonHandlers[keyof CommonHandlers]>[1]
    }
