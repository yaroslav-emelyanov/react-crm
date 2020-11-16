import { Action, Handler, Handlers } from './interfaces'
import { messages } from './constants'

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

export const getQueryParams = (path: string) => {
  const query = path.trim().replace(/^[?#&]/, '')
  const result: { [key: string]: string } = {}

  if (!query) return result

  for (const params of query.split('&')) {
    const [key, value] = params.split('=')
    if (key && value) result[key] = value
  }

  return result
}

export const getErrorMessage = (code: string) =>
  messages[code] || messages.defaultError
