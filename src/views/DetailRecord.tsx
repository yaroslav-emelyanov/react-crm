import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppPaths, RecordTypes } from '../utils/enums'
import { currencyFilter, dateFilter } from '../utils/filters'
import Loader from '../components/app/loader/Loader'
import { useDetailRecord } from '../utils/hooks'

const DetailRecord = () => {
  const { loading, record, category } = useDetailRecord()

  const isOutcome = record?.type === RecordTypes.outcome

  const color = isOutcome ? 'red' : 'green'

  const classes = ['card', color]

  return (
    <div>
      {loading ? (
        <Loader />
      ) : !record || !category ? (
        <p className="center">
          Запись не найдена.{' '}
          <NavLink to={AppPaths.history}>Вернуться на страницу истории</NavLink>
        </p>
      ) : (
        <div>
          <div className="breadcrumb-wrap">
            <NavLink to={AppPaths.history} className="breadcrumb">
              История
            </NavLink>
            <a href="/#" className="breadcrumb">
              {isOutcome ? 'Расход' : 'Доход'}
            </a>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <div className={classes.join(' ')}>
                <div className="card-content white-text">
                  <p>Описание: {record?.description}</p>
                  <p>Сумма: {currencyFilter(record?.amount)}</p>
                  <p>Категория: {category?.name}</p>
                  <small>{dateFilter(record?.date, 'datetime')}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailRecord
