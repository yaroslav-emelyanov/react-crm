import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { useFormContext, ValidationRules } from 'react-hook-form'

interface Props extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string
  label: string
  validationRules?: ValidationRules
}

const TextField = (props: Props) => {
  const { name, label, validationRules = {}, ...rest } = props
  const [uniqueSuffix] = useState(() => Date.now())
  const { register, errors } = useFormContext()
  const classes = ['validate']

  useEffect(() => {
    M.updateTextFields()
  }, [])

  if (errors[name]) classes.push('invalid')

  const id = `${name}-${uniqueSuffix}`

  return (
    <div className="input-field">
      <input
        type="text"
        {...rest}
        id={id}
        name={name}
        className={classes.join(' ')}
        ref={register(validationRules)}
      />
      <label htmlFor={id}>{label}</label>
      {errors[name] && (
        <small className="helper-text invalid">{errors[name].message}</small>
      )}
    </div>
  )
}

export default TextField
