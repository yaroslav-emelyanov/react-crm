import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '../store/rootActions'
import Loader from '../components/app/loader/Loader'
import { RootState } from '../store/rootState'
import { NavLink } from 'react-router-dom'
import { AppPaths } from '../utils/enums'
import { currencyFilter } from '../utils/filters'
import { expandCategories } from '../utils/functions'
import CategoryProgress from '../components/planning/CategoryProgress'

const Planning = () => {
  const { categories, bill, records } = useSelector(
    (state: RootState) => state.info
  )
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await dispatch(action.getCategories())
      await dispatch(action.getRecords())
      setLoading(false)
    })()
  }, [setLoading, dispatch])

  const expandedCategories = useMemo(
    () => expandCategories(categories, records),
    [categories, records]
  )

  return (
    <div>
      <div className="page-title">
        <h3>Планирование</h3>
        <h4>{currencyFilter(bill)}</h4>
      </div>

      {loading ? (
        <Loader />
      ) : !expandedCategories.length ? (
        <p className="center">
          Категорий пока нет.{' '}
          <NavLink to={AppPaths.categories}>Создать категорию</NavLink>
        </p>
      ) : (
        <section>
          {expandedCategories.map((category) => (
            <CategoryProgress category={category} key={category.id} />
          ))}
        </section>
      )}
    </div>
  )
}

export default Planning
