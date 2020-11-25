import { Rate } from './enums'

export type ValueOf<T> = T[keyof T]

export type Action<S, H extends Handlers<S>> = {
  type: keyof H
  payload?: Parameters<H[keyof H]>[1]
}

export type Handler<S> = (state: S, payload: any) => S

export interface Handlers<S> {
  [key: string]: Handler<S>
}

export type Rates = {
  [key in Rate]: number
}
