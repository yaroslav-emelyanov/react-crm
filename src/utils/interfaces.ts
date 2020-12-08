import { Rates, RecordTypes } from './enums'

export type ValueOf<T> = T[keyof T]

export type Action<S, H extends Handlers<S>> = {
  type: keyof H
  payload?: Parameters<H[keyof H]>[1]
}

export type Handler<S> = (state: S, payload: any) => void

export interface Handlers<S> {
  [key: string]: Handler<S>
}

export type CreateAction<
  S,
  H extends Handlers<S>,
  K extends keyof H
> = Parameters<H[K]>[1] extends undefined
  ? { type: K }
  : {
      type: K
      payload: Parameters<H[K]>[1]
    }

export type Rate = {
  [key in Rates]: number
}

export interface Category {
  id: string
  name: string
  limit: number
}

export type CategoryParams = Omit<Category, 'id'>

export interface CategoriesObject {
  [categoryId: string]: Category
}

export type RecordType = keyof typeof RecordTypes

export interface Record {
  categoryId: string
  amount: number
  description: string
  type: RecordType
  date?: string
}
