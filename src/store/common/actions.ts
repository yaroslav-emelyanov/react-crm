import { CommonAction } from './index'
import { OPEN_SIDEBAR } from './constants'

const openSidebar = (): CommonAction => ({
  type: OPEN_SIDEBAR,
})

const commonActions = {
  openSidebar,
}

export default commonActions
