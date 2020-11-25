import { reducerFactory, updateState } from '../../utils/functions'
import { AuthState, authState } from './state'
import { Handlers } from '../../utils/interfaces'
import { SET_AUTH } from './constatns'

interface AuthHandlers<S = AuthState> {
  [SET_AUTH]: (state: S, authenticated: boolean) => S
}

const handlers: AuthHandlers & Handlers<AuthState> = {
  [SET_AUTH]: (state, authenticated) => {
    return updateState(state, { authenticated })
  },
}

export default reducerFactory(authState, handlers)

export type AuthAction = {
  type: keyof AuthHandlers
  payload?: Parameters<AuthHandlers[keyof AuthHandlers]>[1]
}
