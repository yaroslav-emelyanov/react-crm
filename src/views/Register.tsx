import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppPath } from '../utils/enums'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import EmailField from '../components/form/EmailField'
import PasswordField from '../components/form/PasswordField'
import TextField from '../components/form/TextField'
import Checkbox from '../components/form/Checkbox'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'

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
          <EmailField />
          <PasswordField />
          <TextField name="name" label="Имя" message="Введите имя" />
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
