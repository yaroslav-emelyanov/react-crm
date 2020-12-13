import React from 'react'
import { currencyFilter } from '../../utils/filters'
import { ExpandedCategory } from '../../utils/interfaces'
import Tooltip from '../app/tooltip/Tooltip'

interface Props {
  category: ExpandedCategory
}

const CategoryProgress = ({ category }: Props) => {
  const classes = ['determinate', category.progress.color]

  const difference = category.limit - category.spend
  const tooltipText = `${
    difference < 0 ? 'Привышение на' : 'Осталось'
  } ${currencyFilter(Math.abs(difference))}`

  return (
    <div>
      <p>
        <strong>{category.name}</strong> {currencyFilter(category.spend)} из{' '}
        {currencyFilter(category.limit)}
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
