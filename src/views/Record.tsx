import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '../store/rootActions'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../components/form/TextField'
import { RootState } from '../store/rootState'
import CategorySelect from '../components/form/CategorySelect'
import RadioGroup from '../components/form/RadioGroup'
import Loader from '../components/app/loader/Loader'
import { NavLink } from 'react-router-dom'
import { AppPaths, RecordTypes } from '../utils/enums'
import { notification } from '../utils/plugins'
import { NewRecord } from '../utils/interfaces'
import { calculateBill, canCreateRecord } from '../utils/functions'
import { useTranslation } from 'react-i18next'

const defaultValues: NewRecord = {
  categoryId: '',
  amount: 1,
  description: '',
  type: RecordTypes.income,
}

const Record = () => {
  const { categories, bill, name } = useSelector(
    (state: RootState) => state.info
  )
  const [loading, setLoading] = useState(false)
  const formHook = useForm<NewRecord>({ defaultValues })
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const getCategories = useCallback(async () => {
    setLoading(true)
    await dispatch(action.getCategories())
    setLoading(false)
  }, [dispatch, setLoading])

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const onSubmit: SubmitHandler<NewRecord> = async (data) => {
    data.amount = +data.amount

    if (!canCreateRecord(bill, data)) {
      notification.info(t('record.insufficient_funds'))
      return
    }

    await dispatch(action.createRecord({ ...data, date: new Date().toJSON() }))
    await dispatch(
      action.updateUserInfo({ name, bill: calculateBill(bill, data) })
    )

    notification.info(t('record.record_created'))
    formHook.reset(defaultValues)
    M.updateTextFields()
  }

  return (
    <div>
      <div className="page-title">
        <h3>{t('record.label')}</h3>
      </div>

      {loading ? (
        <Loader />
      ) : !categories.length ? (
        <p className="center">
          <span style={{ marginRight: 8 }}>
            {t('record.no_categories_yet')}.
          </span>
          <NavLink to={AppPaths.categories}>
            {t('categories.create_category')}
          </NavLink>
        </p>
      ) : (
        <FormProvider {...formHook}>
          <form className="form" onSubmit={formHook.handleSubmit(onSubmit)}>
            <CategorySelect name="categoryId" items={categories} />

            <RadioGroup
              name="type"
              items={[
                { value: RecordTypes.income, label: t('categories.income') },
                { value: RecordTypes.outcome, label: t('categories.outcome') },
              ]}
            />

            <TextField
              name="amount"
              label={t('form.sum.label')}
              type="number"
              validationRules={{
                required: {
                  value: true,
                  message: t('form.sum.error.required'),
                },
                min: {
                  value: 1,
                  message: t('form.sum.error.min', { min: 1 }),
                },
              }}
            />
            <TextField
              name="description"
              label={t('form.description.label')}
              validationRules={{
                required: {
                  value: true,
                  message: t('form.description.error.required'),
                },
              }}
            />

            <button className="btn waves-effect waves-light" type="submit">
              {t('record.create_record')}
              <i className="material-icons right">send</i>
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default Record
