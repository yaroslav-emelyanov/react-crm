import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import HistoryTableRow from './HistoryTableRow'

const HistoryTable = () => {
  const { records } = useSelector((state: RootState) => state.info)

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {records.map((record, index) => (
          <HistoryTableRow
            record={record}
            recordNumber={index + 1}
            key={record.id}
          />
        ))}
      </tbody>
    </table>
  )
}

export default HistoryTable
