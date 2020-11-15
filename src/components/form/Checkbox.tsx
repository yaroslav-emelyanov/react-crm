import React, { CSSProperties } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
}

const Checkbox = ({ name, label }: Props) => {
  const { register, errors } = useFormContext()
  const style: CSSProperties = {}

  if (errors[name]) style.color = 'red'

  return (
    <p>
      <label>
        <input name={name} type="checkbox" ref={register({ required: true })} />
        <span style={style}>{label}</span>
      </label>
    </p>
  )
}

export default Checkbox
