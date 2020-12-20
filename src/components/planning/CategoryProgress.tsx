import React from 'react'
import { currencyFilter } from '../../utils/filters'
import { ExpandedCategory } from '../../utils/interfaces'
import Tooltip from '../app/tooltip/Tooltip'
import { useTranslation } from 'react-i18next'

interface Props {
  category: ExpandedCategory
}

const CategoryProgress = ({ category }: Props) => {
  const { t } = useTranslation()

  const classes = ['determinate', category.progress.color]

  const difference = category.limit - category.spend
  const amount = currencyFilter(Math.abs(difference))
  const tooltipText =
    difference < 0
      ? t('planning.excess', { amount })
      : t('planning.left', { amount })

  const spent = currencyFilter(category.spend)
  const limit = currencyFilter(category.limit)

  return (
    <div>
      <p>
        <strong style={{ marginRight: 8 }}>{category.name}</strong>
        <span>{t('planning.from', { spent, limit })}</span>
      </p>
      <Tooltip title={tooltipText}>
        <div className="progress">
          <div
            className={classes.join(' ')}
            style={{ width: category.progress.percent + '%' }}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default CategoryProgress
