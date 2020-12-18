import React, { useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import TextField from '../components/form/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { action } from '../store/rootActions'
import { notification } from '../utils/plugins'

interface DefaultValues {
  name: string
}

const defaultValues: DefaultValues = {
  name: '',
}

const Profile = () => {
  const { name, bill } = useSelector((state: RootState) => state.info)
  const { reset, ...formHook } = useForm({ defaultValues })
  const dispatch = useDispatch()

  useEffect(() => {
    reset({ name })
    setTimeout(() => M.updateTextFields())
  }, [name, reset])

  const onSubmit: SubmitHandler<DefaultValues> = async ({ name }) => {
    await dispatch(action.updateUserInfo({ name, bill }))
    notification.info('Имя пользователя обновлено')
  }

  return (
    <div>
      <div className="page-title">
        <h3>Профиль</h3>
      </div>

      <form className="form" onSubmit={formHook.handleSubmit(onSubmit)}>
        <FormProvider reset={reset} {...formHook}>
          <TextField
            name="name"
            label={'Имя'}
            validationRules={{
              required: { value: true, message: 'Вам нужно ввести своё имя' },
            }}
          />
          <div className="switch" style={{ marginBottom: 16 }}>
            <label>
              English
              <input type="checkbox" />
              <span className="lever" />
              Русский
            </label>
          </div>

          <button className="btn waves-effect waves-light" type="submit">
            Обновить
            <i className="material-icons right">send</i>
          </button>
        </FormProvider>
      </form>
    </div>
  )
}

export default Profile
