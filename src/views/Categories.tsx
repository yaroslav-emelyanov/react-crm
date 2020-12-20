import React, { useCallback, useEffect, useState } from 'react'
import CreateCategory from '../components/categories/CreateCategory'
import EditCategory from '../components/categories/EditCategory'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'
import Loader from '../components/app/loader/Loader'
import { useTranslation } from 'react-i18next'

const Categories = () => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const getCategories = useCallback(async () => {
    setLoading(true)
    await dispatch(action.getCategories())
    setLoading(false)
  }, [dispatch, setLoading])

  useEffect(() => {
    getCategories()
  }, [getCategories])

  return (
    <div>
      <div className="page-title">
        <h3>{t('categories.label_plural')}</h3>
      </div>
      <section>
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <CreateCategory />
            <EditCategory />
          </div>
        )}
      </section>
    </div>
  )
}

export default Categories
