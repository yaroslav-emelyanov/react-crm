import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AppPaths } from '../utils/enums'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../components/form/TextField'
import Checkbox from '../components/form/Checkbox'
import { useDispatch } from 'react-redux'
import { action } from '../store/rootActions'
import { emailRegex } from '../utils/regex'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit: SubmitHandler<DefaultValues> = async (data) => {
    const access = await dispatch(action.register(data))
    if (!access) return
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
          <TextField
            name="name"
            label={t('form.name.label')}
            validationRules={{
              required: { value: true, message: t('form.name.error.required') },
            }}
          />
          <Checkbox name="agree" label={t('form.agree.label')} />
        </FormProvider>
      </div>
      <div className="card-action">
        <div>
          <button
            className="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            {t('register.register_now')}
            <i className="material-icons right">send</i>
          </button>
        </div>
        <p className="center">
          <span style={{ marginRight: 8 }}>{t('register.account_exist')}</span>
          <NavLink to={AppPaths.login}>{t('register.come_in')}</NavLink>
        </p>
      </div>
    </form>
  )
}

export default Register
