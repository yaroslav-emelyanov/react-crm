import React, { useEffect, useRef } from 'react'
import { currencyFilter } from '../../utils/filters'
import { ExpandedCategory } from '../../utils/interfaces'

interface Props {
  category: ExpandedCategory
}

const CategoryProgress = ({ category }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const classes = ['determinate', category.progress.color]

  const difference = category.limit - category.spend
  const tooltipText = `${
    difference < 0 ? 'Привышение на' : 'Осталось'
  } ${currencyFilter(Math.abs(difference))}`

  useEffect(() => {
    const el = ref.current
    return () => {
      if (el) M.Tooltip.getInstance(el)?.destroy()
    }
  }, [])

  const handleMouseOver = () => {
    if (ref.current) {
      const tooltip = M.Tooltip.getInstance(ref.current)
      if (!tooltip) {
        M.Tooltip.init(ref.current, { html: tooltipText })
      } else {
        tooltip.open()
      }
    }
  }

  return (
    <div>
      <p>
        <strong>{category.name}</strong> {currencyFilter(category.spend)} из{' '}
        {currencyFilter(category.limit)}
      </p>
      <div ref={ref} onMouseOver={handleMouseOver} className="progress">
        <div
          className={classes.join(' ')}
          style={{ width: category.progress.percent + '%' }}
        />
      </div>
    </div>
  )
}

export default CategoryProgress
