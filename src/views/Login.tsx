import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AppPath } from '../utils/enums'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'
import TextField from '../components/form/TextField'
import { emailRegex } from '../utils/regex'

interface DefaultValues {
  email: string
  password: string
}

const defaultValues: DefaultValues = {
  email: '',
  password: '',
}

const Login = () => {
  const form = useForm({ defaultValues })
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit: SubmitHandler<DefaultValues> = async (data) => {
    const response = await dispatch(action.login(data))
    if (!response) return
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
        </FormProvider>
      </div>
      <div className="card-action">
        <div>
          <button
            className="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i className="material-icons right">send</i>
          </button>
        </div>

        <p className="center">
          Нет аккаунта?
          <NavLink to={AppPath.register}>Зарегистрироваться</NavLink>
        </p>
      </div>
    </form>
  )
}

export default Login
