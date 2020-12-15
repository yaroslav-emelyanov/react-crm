import React from 'react'
import HistoryTableRow from './HistoryTableRow'
import { Record } from '../../utils/interfaces'

interface Props {
  records: Record[]
}

const HistoryTable = ({ records }: Props) => {
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
