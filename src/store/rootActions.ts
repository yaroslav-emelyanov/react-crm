import commonActions from './common/actions'
import authActions from './auth/actions'
import infoActions from './info/actions'

export const action = {
  ...commonActions,
  ...authActions,
  ...infoActions,
}
