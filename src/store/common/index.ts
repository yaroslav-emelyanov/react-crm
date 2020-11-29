import { reducerFactory } from '../../utils/functions'
import { CommonState, commonState } from './state'
import { CreateAction, Handlers } from '../../utils/interfaces'
import { OPEN_SIDEBAR, SET_ERROR } from './constants'

interface CommonHandlers<S = CommonState> {
  [OPEN_SIDEBAR](state: S): void
  [SET_ERROR](state: S, payload: string): void
}

const handlers: CommonHandlers & Handlers<CommonState> = {
  [OPEN_SIDEBAR](state) {
    state.openSidebar = !state.openSidebar
  },
  [SET_ERROR](state, error) {
    state.error = error
  },
}

export default reducerFactory(commonState, handlers)

export type CommonAction<K extends keyof typeof handlers> = CreateAction<
  CommonState,
  typeof handlers,
  K
>
