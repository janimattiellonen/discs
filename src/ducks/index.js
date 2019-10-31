import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import discs from './discs'

export default history =>
  combineReducers({
    router: connectRouter(history),
    discs,
  })
