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
}) => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return true
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
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
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
    return false
  }
}

const logout = () => async (dispatch: Dispatch) => {
  try {
    await firebase.auth().signOut()
  } catch (e) {
    dispatch<CommonAction<typeof SET_ERROR>>({
      type: SET_ERROR,
      payload: getErrorMessage(e.code),
    })
  }
}

const authActions = {
  login,
  register,
  logout,
}

export default authActions
