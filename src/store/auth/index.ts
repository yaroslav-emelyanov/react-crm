import { reducerFactory } from '../../utils/functions'
import { AuthState, authState } from './state'
import { Handlers } from '../../utils/interfaces'

interface AuthHandlers {}

const handlers: Handlers<AuthState> & AuthHandlers = {}

export default reducerFactory(authState, handlers)

export type AuthAction = {
  type: keyof AuthHandlers
  payload?: Parameters<AuthHandlers[keyof AuthHandlers]>[1]
}
