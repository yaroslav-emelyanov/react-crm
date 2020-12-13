import {
  Action,
  Category,
  CategoryProgress,
  ExpandedCategory,
  Handler,
  Handlers,
  NewRecord,
  Record,
} from './interfaces'
import { messages } from './constants'
import clone from 'clone'
import { ProgressColors, RecordTypes } from './enums'

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

export const canCreateRecord = (bill: number, record: NewRecord | Record) =>
  record.type === RecordTypes.outcome && record.amount > bill

export const calculateBill = (bill: number, record: NewRecord | Record) =>
  record.type === RecordTypes.income
    ? bill + record.amount
    : bill - record.amount

export const getCategorySpend = (categoryId: string, records: Record[]) =>
  records
    .filter((record) => record.categoryId === categoryId)
    .filter((record) => record.type === RecordTypes.outcome)
    .reduce((total, record) => (total += record.amount), 0)

export const getCategoryProgress = (
  spend: number,
  limit: number
): CategoryProgress => {
  const percent = (100 * spend) / limit
  const progressPercent = percent > 100 ? 100 : percent
  const color =
    progressPercent < 80
      ? ProgressColors.green
      : progressPercent < 90
      ? ProgressColors.yellow
      : ProgressColors.red

  return {
    percent: progressPercent,
    color,
  }
}

export const expandCategories = (
  categories: Category[],
  records: Record[]
): ExpandedCategory[] => {
  return categories.map((category) => {
    const spend = getCategorySpend(category.id, records)
    const progress = getCategoryProgress(spend, category.limit)
    return {
      ...category,
      spend,
      progress,
    }
  })
}
