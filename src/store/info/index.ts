import { reducerFactory, updateState } from '../../utils/functions'
import { infoState, InfoState } from './state'
import { Handlers, Rates } from '../../utils/interfaces'
import { SET_RATES, SET_USER_INFO } from './constants'

interface InfoHandlers<S = InfoState> {
  [SET_USER_INFO]: (state: S, payload: { bill: number; name: string }) => S
  [SET_RATES]: (state: S, payload: { rates: Rates; dateRates: Date }) => S
}

const handlers: InfoHandlers & Handlers<InfoState> = {
  [SET_USER_INFO]: (state, { bill, name }) => {
    return updateState(state, { bill, name })
  },
  [SET_RATES]: (state, { rates, dateRates: date }) => {
    const dateRates = new Date(date)
    return updateState(state, { rates, dateRates })
  },
}

export default reducerFactory(infoState, handlers)

export type InfoAction = {
  type: keyof InfoHandlers
  payload?: Parameters<InfoHandlers[keyof InfoHandlers]>[1]
}
