import React from 'react'
import { Record } from '../../utils/interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { AppPaths, RecordTypes } from '../../utils/enums'
import { currencyFilter, dateFilter } from '../../utils/filters'
import { useHistory } from 'react-router-dom'
import Tooltip from '../app/tooltip/Tooltip'

interface Props {
  record: Record
  recordNumber: number
}

const HistoryTableRow = ({ record, recordNumber }: Props) => {
  const { categories } = useSelector((state: RootState) => state.info)
  const history = useHistory()

  const handleClick = () => {
    history.push(AppPaths.detailRecord + '/' + record.id)
  }

  const category = categories.find(
    (category) => category.id === record.categoryId
  )

  const isOutcome = record.type === RecordTypes.outcome

  const color = isOutcome ? 'red' : 'green'
  const classes = ['white-text', 'badge', color]

  const textRecordType = isOutcome ? 'Расход' : 'Доход'

  return (
    <tr>
      <td>{recordNumber}</td>
      <td>{currencyFilter(record.amount)}</td>
      <td>{dateFilter(record?.date, 'datetime')}</td>
      <td>{category?.name || '-'}</td>
      <td>
        <span className={classes.join(' ')}>{textRecordType}</span>
      </td>
      <td>
        <Tooltip title={'Просмотреть запись'}>
          <button className="btn-small btn" onClick={handleClick}>
            <i className="material-icons">open_in_new</i>
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}

export default HistoryTableRow
