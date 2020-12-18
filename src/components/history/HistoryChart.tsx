import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { getCategorySpend, getColors } from '../../utils/functions'

const HistoryChart = () => {
  const { categories, records } = useSelector((state: RootState) => state.info)
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d')
      if (ctx) {
        const colors = getColors(categories.length)
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: categories.map((category) => category.name),
            datasets: [
              {
                label: 'Расходы по категориям',
                data: categories.map((category) =>
                  getCategorySpend(category.id, records)
                ),
                backgroundColor: colors['0.2'],
                borderColor: colors['1'],
                borderWidth: 1,
              },
            ],
          },
        })
      }
    }
  }, [categories, records])

  return (
    <div className="history-chart">
      <canvas ref={ref} />
    </div>
  )
}

export default HistoryChart
