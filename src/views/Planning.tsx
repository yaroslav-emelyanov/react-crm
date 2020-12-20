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
import { useTranslation } from 'react-i18next'

const Planning = () => {
  const { categories, bill, records } = useSelector(
    (state: RootState) => state.info
  )
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
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
        <h3>{t('planning.label')}</h3>
        <h4>{currencyFilter(bill)}</h4>
      </div>

      {loading ? (
        <Loader />
      ) : !expandedCategories.length ? (
        <p className="center">
          <span style={{ marginRight: 8 }}>
            {t('planning.no_categories_yet')}.
          </span>
          <NavLink to={AppPaths.categories}>
            {t('planning.create_category')}
          </NavLink>
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
