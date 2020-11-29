import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AppPath } from '../utils/enums'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../components/form/TextField'
import Checkbox from '../components/form/Checkbox'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'
import { emailRegex } from '../utils/regex'

interface DefaultValues {
  email: string
  password: string
  name: string
  agree: boolean
}

const defaultValues: DefaultValues = {
  email: '',
  password: '',
  name: '',
  agree: false,
}

const Register = () => {
  const form = useForm({ defaultValues })
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit: SubmitHandler<DefaultValues> = async (data) => {
    const access = await dispatch(action.register(data))
    if (!access) return
    history.push(AppPath.home)
  }

  return (
    <form className="card auth-card" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="card-content">
        <span className="card-title">Домашняя бухгалтерия</span>
        <FormProvider {...form}>
          <TextField
            name="email"
            label="Email"
            validationRules={{
              required: { value: true, message: 'Введите email' },
              pattern: {
                value: emailRegex,
                message: 'Введите корректную почту',
              },
            }}
          />
          <TextField
            name="password"
            type="password"
            label="Пароль"
            validationRules={{
              required: {
                value: true,
                message: 'Введите пароль',
              },
              minLength: {
                value: 6,
                message: `Пароль не должен быть менее чем ${6} символов`,
              },
            }}
          />
          <TextField
            name="name"
            label="Имя"
            validationRules={{
              required: { value: true, message: 'Введите имя' },
            }}
          />
          <Checkbox name="agree" label="С правилами согласен" />
        </FormProvider>
      </div>
      <div className="card-action">
        <div>
          <button
            className="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Зарегистрироваться
            <i className="material-icons right">send</i>
          </button>
        </div>
        <p className="center">
          Уже есть аккаунт?
          <NavLink to={AppPath.login}>Войти!</NavLink>
        </p>
      </div>
    </form>
  )
}

export default Register
