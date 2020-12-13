import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { getQueryParams } from './functions'
import { notification } from './plugins'
import { messages } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { action } from '../store/rootActions'

export const useTimer = (delay?: number): Date => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), delay || 1000)
    return () => clearInterval(timer)
  }, [delay])

  return time
}

export const useNotification = () => {
  const { error } = useSelector((state: RootState) => state.common)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const { message = '' } = getQueryParams(location.search)
    if (messages[message]) notification.info(messages[message])
  }, [location.search])

  useEffect(() => {
    if (error) {
      notification.error(error)
      dispatch(action.setError(''))
    }
  }, [dispatch, error])
}
