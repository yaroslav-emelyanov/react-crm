import commonActions from './common/actions'
import authActions from './auth/actions'

export const action = {
  ...commonActions,
  ...authActions,
}
