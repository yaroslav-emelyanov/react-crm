import { CommonAction } from './index'
import { OPEN_SIDEBAR, SET_ERROR } from './constants'

const openSidebar = (): CommonAction => ({
  type: OPEN_SIDEBAR,
})

const setError = (error: string): CommonAction => ({
  type: SET_ERROR,
  payload: error,
})

const commonActions = {
  openSidebar,
  setError,
}

export default commonActions
