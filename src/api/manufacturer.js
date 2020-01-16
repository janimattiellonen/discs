import axios from 'axios'

import config from '../config.client'

axios.defaults.withCredentials = true

export default {
  getManufacturers() {
    return axios.get(`${config.server.base_url}/api/manufacturers`).then(res => res.data)
  },
}
