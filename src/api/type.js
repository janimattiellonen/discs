import axios from 'axios'

import config from '../config.client'

axios.defaults.withCredentials = true

export default {
  getTypes() {
    return axios.get(`${config.server.base_url}/api/types`).then(res => res.data)
  },
}
