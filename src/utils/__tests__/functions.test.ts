import {
  calculateBill,
  canCreateRecord,
  computedCurrency,
  expandCategories,
  getBaseRate,
  getCategoryProgress,
  getCategorySpend,
  getChunks,
  getErrorMessage,
  getQueryParams,
  reducerFactory,
} from '../functions'
import { messages } from '../constants'
import { Category, Record } from '../interfaces'
import { ProgressColors, RecordTypes } from '../enums'

describe('reducerFactory', () => {
  it('created reducer should return updated state', () => {
    const handlers = {
      INC: (state: any) => state.count++,
      DEC: (state: any, number: number) => (state.count -= number),
    }

    const initState = { count: 0 }
    const reducer = reducerFactory(initState, handlers)

    expect(reducer(initState, { type: 'INC' })).toStrictEqual({ count: 1 })
    expect(reducer({ count: 2 }, { type: 'DEC', payload: 2 })).toStrictEqual(
      initState
    )
  })
})

describe('getQueryParams', () => {
  it('should return object with query params', () => {
    expect(getQueryParams('?message=hello')).toStrictEqual({ message: 'hello' })
    expect(getQueryParams('?message=hello&id=12345')).toStrictEqual({
      message: 'hello',
      id: '12345',
    })
  })

  it('should return empty object', () => {
    expect(getQueryParams('?message=')).toStrictEqual({})
    expect(getQueryParams('?message')).toStrictEqual({})
    expect(getQueryParams('?')).toStrictEqual({})
    expect(getQueryParams('')).toStrictEqual({})
  })
})

describe('getErrorMessage', () => {
  it('should return error message', () => {
    const errorCode = 'auth/user-not-found'
    expect(getErrorMessage(errorCode)).toBe(messages[errorCode])
  })

  it('should return default error message', () => {
    expect(getErrorMessage('')).toBe(messages.defaultError)
  })
})

describe('getBaseRate', () => {
  it('should return calculation of one against other rate', () => {
    expect(getBaseRate(12, 70, 1)).toBe(840)
  })
})

describe('computedCurrency', () => {
  it('should return number', () => {
    expect(computedCurrency(10, 0.5)).toBe(5)
  })
})

describe('canCreateRecord', () => {
  it('should return true', () => {
    const record = { type: RecordTypes.outcome, amount: 500 } as Record
    expect(canCreateRecord(1000, record)).toBeTruthy()
  })

  it('should return false', () => {
    const record = { type: RecordTypes.outcome, amount: 1100 } as Record
    expect(canCreateRecord(1000, record)).toBeFalsy()
  })
})

describe('calculateBill', () => {
  it('should return bill + amount', () => {
    const record = { type: RecordTypes.income, amount: 500 } as Record
    expect(calculateBill(1000, record)).toBe(1500)
  })

  it('should return bill - amount', () => {
    const record = { type: RecordTypes.outcome, amount: 500 } as Record
    expect(calculateBill(1000, record)).toBe(500)
  })
})

describe('getCategorySpend', () => {
  let records: Record[]

  beforeEach(() => {
    records = [
      {
        type: RecordTypes.outcome,
        amount: 1,
        categoryId: '1',
      } as Record,
      {
        type: RecordTypes.outcome,
        amount: 1,
        categoryId: '1',
      } as Record,
      {
        type: RecordTypes.outcome,
        amount: 1,
        categoryId: '1',
      } as Record,
    ]
  })

  it(`should return amount all records`, () => {
    expect(getCategorySpend('1', records)).toBe(3)
  })

  it(`should return amount two records when one record type = ${RecordTypes.income}`, () => {
    records[2].type = RecordTypes.income
    expect(getCategorySpend('1', records)).toBe(2)
  })

  it(`should return amount two records when one record categoryId = 2`, () => {
    records[2].categoryId = '2'
    expect(getCategorySpend('1', records)).toBe(2)
  })
})

describe('getCategoryProgress', () => {
  it(`should return obj with fields percent = 60, color = ${ProgressColors.green}`, () => {
    expect(getCategoryProgress(600, 1000)).toStrictEqual({
      percent: 60,
      color: ProgressColors.green,
    })
  })

  it(`should return obj with fields percent = 82, color = ${ProgressColors.yellow}`, () => {
    expect(getCategoryProgress(820, 1000)).toStrictEqual({
      percent: 82,
      color: ProgressColors.yellow,
    })
  })
})

describe('expandCategories', () => {
  let categories: Category[]
  let records: Record[]

  beforeEach(() => {
    categories = [
      {
        id: 'asdasd21121',
        name: 'test',
        limit: 100,
      },
    ]

    records = [
      {
        id: 'sdfs32r23r',
        categoryId: 'asdasd21121',
        type: RecordTypes.outcome,
        amount: 80,
        description: 'testing',
      },
    ]
  })

  it(`should return category obj with fields spend, progress`, () => {
    expect(expandCategories(categories, records)[0].progress).toStrictEqual({
      color: ProgressColors.yellow,
      percent: 80,
    })
    expect(expandCategories(categories, records)[0].spend).toBe(80)
  })
})

describe('getChunks', () => {
  it(`should return an array with a nested array`, () => {
    const array = [1, 2, 3]
    expect(getChunks(array, 2)[0].length).toBe(2)
    expect(getChunks(array, 2)[1].length).toBe(1)
    expect(getChunks(array, 3)[0].length).toBe(3)
  })
})
