import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootState from './rootState'

const middleware = [thunk]

export default createStore(
  rootState,
  composeWithDevTools(applyMiddleware(...middleware))
)
