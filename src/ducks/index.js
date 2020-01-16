import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import discs from './discs'
import manufacturers from './manufacturers'
import types from './types'
import user from './user'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    discs,
    manufacturers,
    types,
  })
