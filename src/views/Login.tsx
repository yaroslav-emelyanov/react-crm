import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AppPaths } from '../utils/enums'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'
import TextField from '../components/form/TextField'
import { emailRegex } from '../utils/regex'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit: SubmitHandler<DefaultValues> = async (data) => {
    const response = await dispatch(action.login(data))
    if (!response) return
    history.push(AppPaths.home)
  }

  return (
    <form className="card auth-card" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="card-content">
        <span className="card-title">{t('common.home_bookkeeping')}</span>
        <FormProvider {...form}>
          <TextField
            name="email"
            label="Email"
            validationRules={{
              required: {
                value: true,
                message: t('form.email.error.required'),
              },
              pattern: {
                value: emailRegex,
                message: t('form.email.error.pattern'),
              },
            }}
          />
          <TextField
            name="password"
            type="password"
            label={t('form.password.label')}
            validationRules={{
              required: {
                value: true,
                message: t('form.password.error.required'),
              },
              minLength: {
                value: 6,
                message: t('form.password.error.minLength', { amount: 6 }),
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
            {t('login.come_in')}
            <i className="material-icons right">send</i>
          </button>
        </div>

        <p className="center">
          <span style={{ marginRight: 8 }}>{t('login.account_not_exist')}</span>
          <NavLink to={AppPaths.register}>{t('register.register_now')}</NavLink>
        </p>
      </div>
    </form>
  )
}

export default Login
