import React from 'react'
import HistoryTableRow from './HistoryTableRow'
import { Record } from '../../utils/interfaces'
import { useTranslation } from 'react-i18next'

interface Props {
  records: Record[]
}

const HistoryTable = ({ records }: Props) => {
  const { t } = useTranslation()

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('record.sum')}</th>
          <th>{t('common.date')}</th>
          <th>{t('categories.label')}</th>
          <th>{t('categories.type')}</th>
          <th>{t('categories.open')}</th>
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
