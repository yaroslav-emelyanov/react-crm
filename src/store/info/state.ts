import { Rate, Category, Record } from '../../utils/interfaces'
import { Rates } from '../../utils/enums'

export interface InfoState {
  name: string
  bill: number
  dateRates: Date | undefined
  rates: Rate
  categories: Category[]
  records: Record[]
}

export const infoState: InfoState = {
  name: '',
  bill: 0,
  dateRates: undefined,
  rates: {
    [Rates.RUB]: 0,
    [Rates.USD]: 0,
    [Rates.EUR]: 0,
  },
  categories: [],
  records: [],
}
