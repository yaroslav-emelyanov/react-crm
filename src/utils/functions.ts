import { Action, Handler, Handlers } from './interfaces'

export const reducerFactory = <S, H extends Handlers<S>>(
  initialState: S,
  handlers: H
) => (state: S = initialState, action: Action<S, H>) => {
  const handler: Handler<S> | undefined = handlers[action.type]

  if (!handler) return state

  return handler(state, action.payload)
}

export const updateState = <S>(state: S, update: Partial<S>) =>
  Object.assign({}, state, update)
