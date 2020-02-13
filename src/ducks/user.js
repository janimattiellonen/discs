import { List, Map } from 'immutable'

import cookies from 'react-cookies'

import userApi from '../api/user'

const USER_LOGIN = 'USER/LOGIN'
const USER_LOGIN_DONE = 'USER/LOGIN_DONE'
const USER_LOGIN_FAILED = 'USER/LOGIN_FAILED'

const defaultState = Map({
  user: {},
  isLoggedIn: false,
})

export function login(username, password) {
  return dispatch => {
    dispatch({ type: USER_LOGIN })

    userApi.login(username, password).then(result => dispatch({ type: USER_LOGIN_DONE, payload: result }))
  }
}

export default function(state = defaultState, action = {}) {
  const { type, payload } = action

  switch (type) {
    case USER_LOGIN_DONE:
      console.log('token: ' + payload.token)
      cookies.save('Authorization', 'Bearer: ' + payload.token, { httpOnly: false, path: '/' })
      return state.set('isLoggedIn', true)
    default:
      return state
  }
}
