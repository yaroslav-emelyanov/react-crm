import React, { useCallback, useEffect, useState } from 'react'
import HomeBill from '../components/home/HomeBill'
import HomeCurrency from '../components/home/HomeCurrency'
import Loader from '../components/app/loader/Loader'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const refresh = useCallback(async () => {
    setLoading(true)
    await dispatch(action.getCurrency())
    setLoading(false)
  }, [dispatch, setLoading])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div>
      <div className="page-title">
        <h3>{t('account.label')}</h3>

        <button
          className="btn waves-effect waves-light btn-small"
          onClick={refresh}
        >
          <i className="material-icons">refresh</i>
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <HomeBill />
          <HomeCurrency />
        </div>
      )}
    </div>
  )
}

export default Home
