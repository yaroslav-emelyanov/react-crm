import React from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { AppPath } from '../utils/enums'
import { NavLink, useHistory } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'

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
  const history = useHistory()

  const onSubmit: SubmitHandler<DefaultValues> = (data) => {
    console.log('data', data)
    history.push(AppPath.home)
  }

  return (
    <form className="card auth-card" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="card-content">
        <span className="card-title">Домашняя бухгалтерия</span>
        <FormProvider {...form}>
          <EmailField />
          <PasswordField />
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
