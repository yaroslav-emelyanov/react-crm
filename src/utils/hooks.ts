import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { getQueryParams } from './functions'
import { notification } from './plugins'
import { messages } from './constants'

export const useTimer = (delay?: number): Date => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), delay || 1000)
    return () => clearInterval(timer)
  }, [delay])

  return time
}

export const useNotification = () => {
  const location = useLocation()

  useEffect(() => {
    const { message = '' } = getQueryParams(location.search)
    if (messages[message]) notification.info(messages[message])
  }, [location.search])
}
