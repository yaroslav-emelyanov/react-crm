import { Action, Handler, Handlers } from './interfaces'
import { messages } from './constants'
import clone from 'clone'

export const reducerFactory = <S, H extends Handlers<S>>(
  initialState: S,
  handlers: H
) => (state: S = initialState, action: Action<S, H>) => {
  const handler: Handler<S> | undefined = handlers[action.type]

  if (!handler) return state

  const cloneState = clone(state)

  handler(cloneState, action.payload)

  return cloneState
}

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

export const getBaseRate = (bill: number, from: number, to: number) =>
  bill / (to / from)
export const computedCurrency = (base: number, rate: number) =>
  Math.floor(base * rate)
