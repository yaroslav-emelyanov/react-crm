import React from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { AppPath } from '../utils/enums'
import { NavLink, useHistory } from 'react-router-dom'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'

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
