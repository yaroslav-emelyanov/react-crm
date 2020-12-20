import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../form/TextField'
import { useDispatch } from 'react-redux'
import { action } from '../../store/rootActions'
import { CategoryParams } from '../../utils/interfaces'
import { notification } from '../../utils/plugins'
import { useTranslation } from 'react-i18next'

const defaultValues: CategoryParams = {
  name: '',
  limit: 1,
}

const CreateCategory = () => {
  const formHook = useForm({ defaultValues })
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<CategoryParams> = async (date) => {
    date.limit = +date.limit
    await dispatch(action.createCategory(date))
    formHook.reset()
    M.updateTextFields()
    notification.info(t('categories.category_created'))
  }

  return (
    <div className="col s12 m6">
      <div>
        <div className="page-subtitle">
          <h4>{t('common.create')}</h4>
        </div>
        <FormProvider {...formHook}>
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
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
              {t('common.create')}
              <i className="material-icons right">send</i>
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default CreateCategory
