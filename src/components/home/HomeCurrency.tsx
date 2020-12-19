import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { currencies } from '../../utils/constants'
import { dateFilter } from '../../utils/filters'
import { useTranslation } from 'react-i18next'

const HomeCurrency = () => {
  const { rates, dateRates } = useSelector((state: RootState) => state.info)
  const { t } = useTranslation()

  return (
    <div className="col s12 m6 l8">
      <div className="card orange darken-3 bill-card">
        <div className="card-content white-text">
          <div className="card-header">
            <span className="card-title">
              {t('account.exchange_rate', { count: 5 })}
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>{t('account.currency')}</th>
                <th>{t('account.exchange_rate', { count: 1 })}</th>
                <th>{t('common.date')}</th>
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
