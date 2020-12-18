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

export const getChunks = (array: any[], size: number): any[] => {
  if (!array) return []

  const firstChunk = array.slice(0, size)
  if (!firstChunk.length) {
    return array
  }

  return [firstChunk].concat(getChunks(array.slice(size, array.length), size))
}

export const getRandomNumber = (max: number, min: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

type ColorMap = { [key in '0.2' | '1']: string[] }

export const getColors = (numberColors: number): ColorMap => {
  const map: ColorMap = {
    ['0.2']: [],
    ['1']: [],
  }

  if (!numberColors) return map

  const array = new Array(numberColors).fill('_')

  array.forEach(() => {
    const r = getRandomNumber(255, 0)
    const g = getRandomNumber(255, 0)
    const b = getRandomNumber(255, 0)
    map['0.2'].push(`rgba(${r}, ${g}, ${b}, ${0.2})`)
    map['1'].push(`rgba(${r}, ${g}, ${b}, ${1})`)
  })

  return map
}
