import React, { useEffect, useState } from 'react'
import HistoryTable from '../components/history/HistoryTable'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '../store/rootActions'
import Loader from '../components/app/loader/Loader'
import { RootState } from '../store/rootState'
import { NavLink } from 'react-router-dom'
import { AppPaths } from '../utils/enums'

const History = () => {
  const { records } = useSelector((state: RootState) => state.info)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await dispatch(action.getCategories())
      await dispatch(action.getRecords())
      setLoading(false)
    })()
  }, [dispatch, setLoading])

  return (
    <div>
      <div className="page-title">
        <h3>История записей</h3>
      </div>

      {loading ? (
        <Loader />
      ) : !records.length ? (
        <p className="center">
          Записей пока нет.{' '}
          <NavLink to={AppPaths.record}>Создать запись</NavLink>
        </p>
      ) : (
        <>
          <div className="history-chart">
            <canvas></canvas>
          </div>

          <section>
            <HistoryTable />
          </section>
        </>
      )}
    </div>
  )
}

export default History
