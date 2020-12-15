import { useEffect, useMemo, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { getQueryParams } from './functions'
import { notification } from './plugins'
import { messages } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { action } from '../store/rootActions'
import { Category, Record } from './interfaces'

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

export const useDetailRecord = () => {
  const [record, setRecord] = useState<Record | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>()
  const dispatch = useDispatch<any>()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const record: Record | null = await dispatch(
        action.getRecordById(id || '')
      )
      const category: Category | null = await dispatch(
        action.getCategoryById(record?.categoryId || '')
      )
      setRecord(record)
      setCategory(category)
      setLoading(false)
    })()
  }, [dispatch, setRecord, setCategory, id])

  return {
    loading,
    record,
    category,
  }
}

export const useQueryParams = <Params extends string>() => {
  const { search } = useLocation()

  return useMemo(() => {
    const urlParams = new URLSearchParams(search)
    const map: { [key: string]: string } = {}

    for (const key of urlParams.keys()) {
      const value = urlParams.get(key)
      if (value) map[key] = value
    }

    return map as { [K in Params]?: string }
  }, [search])
}
