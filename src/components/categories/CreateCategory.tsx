import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../form/TextField'
import { useDispatch } from 'react-redux'
import { action } from '../../store/rootActions'
import { CategoryParams } from '../../utils/interfaces'
import { notification } from '../../utils/plugins'

const defaultValues: CategoryParams = {
  name: '',
  limit: 1,
}

const CreateCategory = () => {
  const formHook = useForm({ defaultValues })
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<CategoryParams> = async (date) => {
    date.limit = +date.limit
    await dispatch(action.createCategory(date))
    formHook.reset()
    M.updateTextFields()
    notification.info('Запись была создана')
  }

  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>Создать</h4>
        </div>
        <FormProvider {...formHook}>
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
            <TextField
              name="name"
              label="Название"
              validationRules={{
                required: { value: true, message: 'Введите название' },
              }}
            />

            <TextField
              name="limit"
              type="number"
              label="Лимит"
              validationRules={{
                required: { value: true, message: 'Введите число' },
                min: { value: 1, message: 'Минимальная величина 1' },
              }}
            />
            <button className="btn waves-effect waves-light" type="submit">
              Создать
              <i className="material-icons right">send</i>
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default CreateCategory
