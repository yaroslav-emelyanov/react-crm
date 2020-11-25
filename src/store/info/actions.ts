import { Dispatch } from 'redux'
import { CommonAction } from '../common'
import { SET_ERROR } from '../common/constants'
import { getErrorMessage } from '../../utils/functions'
import firebase from 'firebase'
import { InfoAction } from './index'
import { SET_USER_INFO, SET_RATES } from './constants'
import { InfoState } from './state'
import { Rates } from '../../utils/interfaces'

const FIXER_KEY = process.env.REACT_APP_FIXER_API_KEY

const getUserInfo = () => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    const user = await firebase.auth().currentUser
    const info = await firebase
      .database()
      .ref(`/users/${user?.uid}/info`)
      .once('value')
    const { bill, name }: InfoState = info.val()
    dispatch<InfoAction>({ type: SET_USER_INFO, payload: { bill, name } })
    return true
  } catch (e) {
    dispatch<CommonAction>({
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
    const { rates, date }: { rates: Rates; date: Date } = await response.json()
    dispatch<InfoAction>({
      type: SET_RATES,
      payload: { rates, dateRates: date },
    })
  } catch (e) {
    dispatch<CommonAction>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const infoActions = {
  getUserInfo,
  getCurrency,
}

export default infoActions
