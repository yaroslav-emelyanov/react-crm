import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../form/TextField'
import CategorySelect from '../form/CategorySelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { Category } from '../../utils/interfaces'
import { action } from '../../store/rootActions'
import { notification } from '../../utils/plugins'

const defaultValues: Category = {
  id: '',
  name: '',
  limit: 1,
}

const EditCategory = () => {
  const { categories } = useSelector((state: RootState) => state.info)
  const formHook = useForm({ defaultValues })
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Category> = async (date) => {
    await dispatch(action.updateCategory(date))
    notification.info('Категория успешно обновлена')
  }

  if (!categories.length) return <p className="center">Категорий пока нет</p>

  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>Редактировать</h4>
        </div>

        <FormProvider {...formHook}>
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
            <CategorySelect items={categories} />
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
              Обновить
              <i className="material-icons right">send</i>
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EditCategory
