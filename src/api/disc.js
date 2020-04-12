import axios from 'axios'
import createAuth0Client from '@auth0/auth0-spa-js'

import config from '../config.client'
/*
const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirect_uri: window.location.origin,
}

const getToken = async () => {
  const auth0Client = await createAuth0Client(auth0Config)

  const token = await auth0Client.getTokenSilently()

  return token
}

const token = getToken()
console.log('======Token: ' + JSON.stringify(token))
*/

export default {
  getDiscs() {
    return axios.get(`${config.server.base_url}/api/discs`).then(res => {
      console.log('data: ' + JSON.stringify(res, null, 2))
      return res.data
    })
  },

  addDisc(data, token) {
    console.log('About to add a new disc: ')

    return axios
      .post(`${config.server.base_url}/api/discs`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => res.data)
  },
}
