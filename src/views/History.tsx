import React, { useEffect, useMemo, useState } from 'react'
import HistoryTable from '../components/history/HistoryTable'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '../store/rootActions'
import Loader from '../components/app/loader/Loader'
import { RootState } from '../store/rootState'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { AppPaths } from '../utils/enums'
import { getChunks } from '../utils/functions'
import Paginate from '../components/app/Pagination'
import { useQueryParams } from '../utils/hooks'

const History = () => {
  const { records } = useSelector((state: RootState) => state.info)
  const [loading, setLoading] = useState(false)
  const { page } = useQueryParams<'page'>()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await dispatch(action.getCategories())
      await dispatch(action.getRecords())
      setLoading(false)
    })()
  }, [dispatch, setLoading])

  const chunkRecords = useMemo(() => getChunks(records, 5), [records])

  const currentRecords = chunkRecords[Number(page) - 1] || chunkRecords[0]

  return (
    <div>
      <div className="page-title">
        <h3>История записей</h3>
      </div>

      {loading ? (
        <Loader />
      ) : !chunkRecords.length ? (
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
            <HistoryTable records={currentRecords} />
            <Paginate pageCount={chunkRecords.length} />
          </section>
        </>
      )}
    </div>
  )
}

export default History
