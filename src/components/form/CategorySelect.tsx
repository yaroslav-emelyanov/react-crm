import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Category } from '../../utils/interfaces'
import { useFormContext } from 'react-hook-form'

interface Props {
  items: Category[]
}

let select: M.FormSelect | null

const CategorySelect = ({ items }: Props) => {
  const [selected, setSelected] = useState('')
  const ref = useRef<HTMLSelectElement>(null)
  const { reset, register } = useFormContext()

  const category = useMemo(() => items.find((item) => item.id === selected), [
    items,
    selected,
  ])

  useEffect(() => {
    if (category) {
      reset(category)
      setTimeout(() => M.updateTextFields())
    }
  }, [category, reset])

  useEffect(() => {
    if (!selected) setSelected(items[0].id)
    if (ref.current) {
      select?.destroy()
      select = M.FormSelect.init(ref.current)
      register(ref.current)
    }
  }, [items, register, selected])

  return (
    <div className="input-field">
      <select
        name="id"
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
      <label>Выберите категорию</label>
    </div>
  )
}

export default CategorySelect
