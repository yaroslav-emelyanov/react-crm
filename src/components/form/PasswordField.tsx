import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  minLength?: number
}

const PasswordField = ({ minLength = 6 }: Props) => {
  const { register, errors } = useFormContext()
  const classes = ['validate']

  if (errors?.password) classes.push('invalid')

  return (
    <div className="input-field">
      <input
        id="password"
        name="password"
        type="password"
        className={classes.join(' ')}
        ref={register({
          required: {
            value: true,
            message: 'Введите пароль',
          },
          minLength: {
            value: minLength,
            message: `Пароль не должен быть менее чем ${minLength} символов`,
          },
        })}
      />
      <label htmlFor="password">Пароль</label>
      {errors?.password && (
        <small className="helper-text invalid">{errors.password.message}</small>
      )}
    </div>
  )
}

export default PasswordField
