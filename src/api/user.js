import axios from 'axios'

import config from '../config.client'
axios.defaults.withCredentials = true

export default {
  login(username, password) {
    return axios.post(`${config.server.base_url}/api/login`, { username, password }).then(res => res.data)
  },
}
