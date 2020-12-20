import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Category } from '../../utils/interfaces'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props {
  name: string
  items: Category[]
  updateCategory?: boolean
}

let select: M.FormSelect | null

const CategorySelect = ({ name, items, updateCategory = false }: Props) => {
  const [selected, setSelected] = useState('')
  const ref = useRef<HTMLSelectElement>(null)
  const { reset, register } = useFormContext()
  const { t } = useTranslation()

  const category = useMemo(() => items.find((item) => item.id === selected), [
    items,
    selected,
  ])

  useEffect(() => {
    if (updateCategory && category) {
      reset(category)
      setTimeout(() => M.updateTextFields())
    }
  }, [updateCategory, category, reset])

  useEffect(() => {
    if (!selected && items.length) setSelected(items[0].id)
    if (ref.current) {
      select?.destroy()
      select = M.FormSelect.init(ref.current)
      register(ref.current)
    }
  }, [items, register, selected])

  return (
    <div className="input-field">
      <select
        name={name}
        ref={ref}
        onChange={(event) => setSelected(event.target.value)}
        value={selected}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label>{t('record.select_category')}</label>
    </div>
  )
}

export default CategorySelect
