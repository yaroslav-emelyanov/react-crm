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

    if (canCreateRecord(bill, data)) {
      notification.info(`Не достаточно средств на счёте`)
      return
    }

    await dispatch(action.createRecord({ ...data, date: new Date().toJSON() }))
    await dispatch(
      action.updateUserInfo({ name, bill: calculateBill(bill, data) })
    )

    notification.info(`Запись успешно создана`)
    formHook.reset(defaultValues)
    M.updateTextFields()
  }

  return (
    <div>
      <div className="page-title">
        <h3>Новая запись</h3>
      </div>

      {loading ? (
        <Loader />
      ) : !categories.length ? (
        <p className="center">
          Категорий пока нет.{' '}
          <NavLink to={AppPaths.categories}>Создать категорию</NavLink>
        </p>
      ) : (
        <FormProvider {...formHook}>
          <form className="form" onSubmit={formHook.handleSubmit(onSubmit)}>
            <CategorySelect name="categoryId" items={categories} />

            <RadioGroup
              name="type"
              items={[
                { value: 'income', label: 'Доход' },
                { value: 'outcome', label: 'Расход' },
              ]}
            />

            <TextField
              name="amount"
              label="Сумма"
              type="number"
              validationRules={{
                required: { value: true, message: 'Введите сумму' },
                min: {
                  value: 1,
                  message: 'Сумма должна быть больше или равна 1',
                },
              }}
            />
            <TextField
              name="description"
              label="Описание"
              validationRules={{
                required: { value: true, message: 'Введите описание' },
              }}
            />

            <button className="btn waves-effect waves-light" type="submit">
              Создать
              <i className="material-icons right">send</i>
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default Record
