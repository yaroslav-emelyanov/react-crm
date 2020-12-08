import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

interface Props {
  name: string
  items: { value: string; label: string }[]
}

const RadioGroup = ({ name, items }: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ value, onChange }) => (
        <>
          {items.map((item) => (
            <p key={item.value}>
              <label>
                <input
                  className="with-gap"
                  name={name}
                  type="radio"
                  value={item.value}
                  checked={value === item.value}
                  onChange={onChange}
                />
                <span>{item.label}</span>
              </label>
            </p>
          ))}
        </>
      )}
    />
  )
}

export default RadioGroup
