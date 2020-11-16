import { Dispatch } from 'redux'
import firebase from 'firebase'
import { CommonAction } from '../common'
import { SET_ERROR } from '../common/constants'
import { getErrorMessage } from '../../utils/functions'

const login = ({
  email,
  password,
}: {
  email: string
  password: string
}) => async (dispatch: Dispatch<CommonAction>): Promise<boolean> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return true
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: getErrorMessage(e.code) })
    return false
  }
}

const register = ({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}) => async (dispatch: Dispatch<CommonAction>): Promise<boolean> => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = await firebase.auth().currentUser
    await firebase.database().ref(`users/${user?.uid}/info`).set({
      name,
      bill: 10000,
    })
    return true
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: getErrorMessage(e.code) })
    return false
  }
}

const authActions = {
  login,
  register,
}

export default authActions
