import { Rates } from './enums'

export const dateFilter = (
  value?: Date | string,
  format: string = 'date'
): string => {
  if (!value) return '-'
  const options: Intl.DateTimeFormatOptions = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.second = '2-digit'
    options.minute = '2-digit'
    options.hour = '2-digit'
  }

  const resultValue = typeof value === 'string' ? new Date(value) : value

  return new Intl.DateTimeFormat('ru-RU', options).format(resultValue)
}

export const currencyFilter = (value: number, currency: Rates = Rates.RUB) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(value)
}
