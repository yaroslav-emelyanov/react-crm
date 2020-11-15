export const dateFilter = (value: Date, format: string = 'date') => {
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

  return new Intl.DateTimeFormat('ru-RU', options).format(value)
}
