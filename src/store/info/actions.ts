import { Dispatch } from 'redux'
import { CommonAction } from '../common'
import { SET_ERROR } from '../common/constants'
import { getErrorMessage } from '../../utils/functions'
import firebase from 'firebase'
import { InfoAction } from './index'
import {
  SET_USER_INFO,
  SET_RATES,
  ADD_CATEGORY,
  SET_CATEGORIES,
  UPDATE_CATEGORY,
  CREATE_RECORD,
  SET_RECORDS,
} from './constants'
import { InfoState } from './state'
import {
  CategoriesObject,
  Category,
  CategoryParams,
  NewRecord,
  Rate,
  Record,
  RecordsObject,
} from '../../utils/interfaces'

const FIXER_KEY = process.env.REACT_APP_FIXER_API_KEY

const getUserInfo = () => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    const user = await firebase.auth().currentUser
    const info = await firebase
      .database()
      .ref(`/users/${user?.uid}/info`)
      .once('value')
    const { bill, name }: InfoState = info.val()
    dispatch<InfoAction<typeof SET_USER_INFO>>({
      type: SET_USER_INFO,
      payload: { bill, name },
    })
    return true
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
    return false
  }
}

const getCurrency = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await fetch(
      `http://data.fixer.io/api/latest?access_key=${FIXER_KEY}&symbols=USD,EUR,RUB`
    )
    const { rates, date }: { rates: Rate; date: Date } = await response.json()
    dispatch<InfoAction<typeof SET_RATES>>({
      type: SET_RATES,
      payload: { rates, dateRates: date },
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const createCategory = (category: CategoryParams) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const user = firebase.auth().currentUser
    const response = await firebase
      .database()
      .ref(`/users/${user?.uid}/categories`)
      .push(category)
    dispatch<InfoAction<typeof ADD_CATEGORY>>({
      type: ADD_CATEGORY,
      payload: { ...category, id: response?.key || '' },
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const getCategories = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const user = firebase.auth().currentUser
    const response = await firebase
      .database()
      .ref(`/users/${user?.uid}/categories`)
      .once('value')
    const categoriesObject: CategoriesObject = response.val() || {}
    dispatch<InfoAction<typeof SET_CATEGORIES>>({
      type: SET_CATEGORIES,
      payload: categoriesObject,
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const updateCategory = (category: Category) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const user = firebase.auth().currentUser
    await firebase
      .database()
      .ref(`/users/${user?.uid}/categories`)
      .child(category.id)
      .update({ name: category.name, limit: category.limit })
    dispatch<InfoAction<typeof UPDATE_CATEGORY>>({
      type: UPDATE_CATEGORY,
      payload: category,
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const createRecord = (record: NewRecord) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const user = firebase.auth().currentUser
    const response = await firebase
      .database()
      .ref(`/users/${user?.uid}/records`)
      .push(record)
    dispatch<InfoAction<typeof CREATE_RECORD>>({
      type: CREATE_RECORD,
      payload: { ...record, id: response?.key || '' },
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const updateUserInfo = (userInfo: { name: string; bill: number }) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const user = firebase.auth().currentUser
    await firebase.database().ref(`/users/${user?.uid}/info`).update(userInfo)
    dispatch<InfoAction<typeof SET_USER_INFO>>({
      type: SET_USER_INFO,
      payload: userInfo,
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const getRecords = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const user = firebase.auth().currentUser
    const response = await firebase
      .database()
      .ref(`/users/${user?.uid}/records`)
      .once('value')
    const recordsObject: RecordsObject = response.val() || {}
    dispatch<InfoAction<typeof SET_RECORDS>>({
      type: SET_RECORDS,
      payload: recordsObject,
    })
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const getRecordById = (recordId: string) => async (
  dispatch: Dispatch
): Promise<Record | null> => {
  try {
    const user = firebase.auth().currentUser
    const response = await firebase
      .database()
      .ref(`/users/${user?.uid}/records`)
      .child(recordId)
      .once('value')
    const record: NewRecord | null = response.val()
    return record ? { ...record, id: recordId } : null
  } catch (e) {
    return null
  }
}

const getCategoryById = (categoryId: string) => async (
  dispatch: Dispatch
): Promise<Category | null> => {
  try {
    const user = firebase.auth().currentUser
    const response = await firebase
      .database()
      .ref(`/users/${user?.uid}/categories`)
      .child(categoryId)
      .once('value')
    const category: Omit<Category, 'id'> | null = response.val()
    return category ? { ...category, id: categoryId } : null
  } catch (e) {
    return null
  }
}

const infoActions = {
  getUserInfo,
  getCurrency,
  createCategory,
  getCategories,
  updateCategory,
  createRecord,
  updateUserInfo,
  getRecords,
  getRecordById,
  getCategoryById,
}

export default infoActions
