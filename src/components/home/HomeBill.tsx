import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { computedCurrency, getBaseRate } from '../../utils/functions'
import { currencyFilter } from '../../utils/filters'
import { currencies } from '../../utils/constants'
import { useTranslation } from 'react-i18next'

const HomeBill = () => {
  const { bill, rates } = useSelector((state: RootState) => state.info)
  const { t } = useTranslation()

  const baseRate = getBaseRate(bill, rates.EUR, rates.RUB)

  return (
    <div className="col s12 m6 l4">
      <div className="card light-blue bill-card">
        <div className="card-content white-text">
          <span className="card-title">{t('account.currency_account')}</span>
          {currencies.map((currency) => {
            const compCur = computedCurrency(baseRate, rates[currency])
            return (
              <p className="currency-line" key={currency}>
                <span>{currencyFilter(compCur, currency)}</span>
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeBill
