import { Dispatch } from 'redux'
import firebase from 'firebase'
import { CommonAction } from '../common'
import { SET_ERROR } from '../common/constants'
import { getErrorMessage } from '../../utils/functions'
import { AuthAction } from './index'
import { SET_AUTH } from './constatns'

const login = ({
  email,
  password,
}: {
  email: string
  password: string
}) => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return true
  } catch (e) {
    dispatch<CommonAction>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
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
}) => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = await firebase.auth().currentUser
    await firebase.database().ref(`users/${user?.uid}/info`).set({
      name,
      bill: 10000,
    })
    return true
  } catch (e) {
    dispatch<CommonAction>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
    return false
  }
}

const authentication = (value: boolean): AuthAction => ({
  type: SET_AUTH,
  payload: value,
})

const logout = () => async (dispatch: Dispatch) => {
  try {
    await firebase.auth().signOut()
    dispatch({ type: SET_AUTH, payload: false })
  } catch (e) {
    dispatch<CommonAction>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const authActions = {
  login,
  register,
  authentication,
  logout,
}

export default authActions
