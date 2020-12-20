import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../form/TextField'
import CategorySelect from '../form/CategorySelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'
import { Category } from '../../utils/interfaces'
import { action } from '../../store/rootActions'
import { notification } from '../../utils/plugins'
import { useTranslation } from 'react-i18next'

const defaultValues: Category = {
  id: '',
  name: '',
  limit: 1,
}

const EditCategory = () => {
  const { categories } = useSelector((state: RootState) => state.info)
  const formHook = useForm({ defaultValues })
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Category> = async (date) => {
    date.limit = +date.limit
    await dispatch(action.updateCategory(date))
    notification.info(t('categories.category_updated'))
  }

  if (!categories.length)
    return <p className="center">{t('record.no_categories_yet')}</p>

  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>{t('common.edit')}</h4>
        </div>

        <FormProvider {...formHook}>
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
            <CategorySelect name="id" items={categories} updateCategory />
            <TextField
              name="name"
              label={t('form.category_name.label')}
              validationRules={{
                required: {
                  value: true,
                  message: t('form.category_name.error.required'),
                },
              }}
            />

            <TextField
              name="limit"
              type="number"
              label={t('form.limit.label')}
              validationRules={{
                required: {
                  value: true,
                  message: t('form.limit.error.required'),
                },
                min: {
                  value: 1,
                  message: t('form.limit.error.min', { min: 1 }),
                },
              }}
            />

            <button className="btn waves-effect waves-light" type="submit">
              {t('common.update')}
              <i className="material-icons right">send</i>
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EditCategory
