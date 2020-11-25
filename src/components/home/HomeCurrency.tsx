import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { currencies } from '../../utils/constants'
import { dateFilter } from '../../utils/filters'

const HomeCurrency = () => {
  const { rates, dateRates } = useSelector((state: RootState) => state.info)

  return (
    <div className="col s12 m6 l8">
      <div className="card orange darken-3 bill-card">
        <div className="card-content white-text">
          <div className="card-header">
            <span className="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Валюта</th>
                <th>Курс</th>
                <th>Дата</th>
              </tr>
            </thead>

            <tbody>
              {currencies.map((currency) => {
                return (
                  <tr key={currency}>
                    <td>{currency}</td>
                    <td>{rates[currency].toFixed(3)}</td>
                    <td>{dateFilter(dateRates)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HomeCurrency
