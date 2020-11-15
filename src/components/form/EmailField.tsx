import React from 'react'
import { emailRegex } from '../../utils/regex'
import { useFormContext } from 'react-hook-form'

const EmailField = () => {
  const { register, errors } = useFormContext()
  const classes = ['validate']

  if (errors?.password) classes.push('invalid')

  return (
    <div className="input-field">
      <input
        id="email"
        name="email"
        type="text"
        className={classes.join(' ')}
        ref={register({
          required: { value: true, message: 'Введите email' },
          pattern: {
            value: emailRegex,
            message: 'Введите корректную почту',
          },
        })}
      />
      <label htmlFor="email">Email</label>
      {errors?.email && (
        <small className="helper-text invalid">{errors.email.message}</small>
      )}
    </div>
  )
}

export default EmailField
