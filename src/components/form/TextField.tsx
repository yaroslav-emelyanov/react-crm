import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
  message?: string
}

const TextField = (props: Props) => {
  const { register, errors } = useFormContext()
  const { name, label, message = '' } = props
  const classes = ['validate']

  if (errors[name]) classes.push('invalid')

  return (
    <div className="input-field">
      <input
        id="text"
        name={name}
        type="text"
        className={classes.join(' ')}
        ref={register({ required: { value: true, message } })}
      />
      <label htmlFor="text">{label}</label>
      {errors[name] && (
        <small className="helper-text invalid">{errors[name].message}</small>
      )}
    </div>
  )
}

export default TextField
