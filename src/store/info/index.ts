import { reducerFactory } from '../../utils/functions'
import { infoState, InfoState } from './state'
import {
  CategoriesObject,
  Category,
  CreateAction,
  Handlers,
  Rate,
  Record,
  RecordsObject,
} from '../../utils/interfaces'
import {
  ADD_CATEGORY,
  SET_CATEGORIES,
  SET_RATES,
  SET_USER_INFO,
  UPDATE_CATEGORY,
  CREATE_RECORD,
  SET_RECORDS,
} from './constants'

interface InfoHandlers<S = InfoState> {
  [SET_USER_INFO](state: S, payload: { bill: number; name: string }): void
  [SET_RATES](state: S, payload: { rates: Rate; dateRates: Date }): void
  [ADD_CATEGORY](state: S, payload: Category): void
  [SET_CATEGORIES](state: S, payload: CategoriesObject): void
  [UPDATE_CATEGORY](state: S, payload: Category): void
  [CREATE_RECORD](state: S, payload: Record): void
  [SET_RECORDS](state: S, payload: RecordsObject): void
}

const handlers: InfoHandlers & Handlers<InfoState> = {
  [SET_USER_INFO](state, { bill, name }) {
    state.bill = bill
    state.name = name
  },
  [SET_RATES](state, { rates, dateRates }) {
    state.rates = rates
    state.dateRates = new Date(dateRates)
  },
  [ADD_CATEGORY](state, category) {
    state.categories = [...state.categories, category]
  },
  [SET_CATEGORIES](state, categoriesObject) {
    state.categories = Object.keys(categoriesObject).map((categoryId) => ({
      ...categoriesObject[categoryId],
      id: categoryId,
    }))
  },
  [UPDATE_CATEGORY](state, updatedCategory) {
    const categoryIndex = state.categories.findIndex(
      (category) => category.id === updatedCategory.id
    )
    if (categoryIndex >= 0) {
      state.categories[categoryIndex] = updatedCategory
    }
  },
  [CREATE_RECORD](state, record) {
    state.records.push(record)
  },
  [SET_RECORDS](state, recordsObject) {
    state.records = Object.keys(recordsObject).map((recordId) => ({
      ...recordsObject[recordId],
      id: recordId,
    }))
  },
}

export default reducerFactory(infoState, handlers)

export type InfoAction<K extends keyof typeof handlers> = CreateAction<
  InfoState,
  typeof handlers,
  K
>
