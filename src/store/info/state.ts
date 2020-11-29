import { Rates, Category } from '../../utils/interfaces'
import { Rate } from '../../utils/enums'

export interface InfoState {
  name: string
  bill: number
  dateRates: Date | undefined
  rates: Rates
  categories: Category[]
}

export const infoState: InfoState = {
  name: '',
  bill: 0,
  dateRates: undefined,
  rates: {
    [Rate.RUB]: 0,
    [Rate.USD]: 0,
    [Rate.EUR]: 0,
  },
  categories: [],
}
