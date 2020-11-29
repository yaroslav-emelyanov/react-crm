import { CommonAction } from './index'
import { OPEN_SIDEBAR, SET_ERROR } from './constants'

const openSidebar = (): CommonAction<typeof OPEN_SIDEBAR> => ({
  type: OPEN_SIDEBAR,
})

const setError = (error: string): CommonAction<typeof SET_ERROR> => ({
  type: SET_ERROR,
  payload: error,
})

const commonActions = {
  openSidebar,
  setError,
}

export default commonActions
