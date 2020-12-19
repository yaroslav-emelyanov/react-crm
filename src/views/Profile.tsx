import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../components/form/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { action } from '../store/rootActions'
import { notification } from '../utils/plugins'
import { Language } from '../i18n'
import { useTranslation } from 'react-i18next'

interface DefaultValues {
  name: string
}

const defaultValues: DefaultValues = {
  name: '',
}

const Profile = () => {
  const { name, bill } = useSelector((state: RootState) => state.info)
  const { reset, ...formHook } = useForm({ defaultValues })
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const isRussianLang = i18n.language === Language.russian

  useEffect(() => {
    reset({ name })
    setTimeout(() => M.updateTextFields())
  }, [name, reset])

  const onSubmit: SubmitHandler<DefaultValues> = async ({ name }) => {
    await dispatch(action.updateUserInfo({ name, bill }))
    notification.info(t('profile.updated_user_name'))
  }

  const handleChangeLang = () => {
    const lang = isRussianLang ? Language.english : Language.russian
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <div>
      <div className="page-title">
        <h3>{t('profile.label')}</h3>
      </div>

      <form className="form" onSubmit={formHook.handleSubmit(onSubmit)}>
        <FormProvider reset={reset} {...formHook}>
          <TextField
            name="name"
            label={t('form.name.label')}
            validationRules={{
              required: { value: true, message: t('form.name.error.required') },
            }}
          />
          <div className="switch" style={{ marginBottom: 16 }}>
            <label>
              English
              <input
                type="checkbox"
                onChange={handleChangeLang}
                checked={isRussianLang}
              />
              <span className="lever" />
              Русский
            </label>
          </div>

          <button className="btn waves-effect waves-light" type="submit">
            {t('profile.update')}
            <i className="material-icons right">send</i>
          </button>
        </FormProvider>
      </form>
    </div>
  )
}

export default Profile
