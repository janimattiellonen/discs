import axios from 'axios'

import config from '../config.client'

axios.defaults.withCredentials = true

export default {
  getDiscs() {
    return axios
      .get(`${config.server.base_url}/api/discs`, {
        withCredentials: true,
        'Access-Control-Request-Headers': 'Origin, Accept, Content-Type',
      })
      .then(res => res.data)
  },

  addDisc(data) {
    return axios.post(`${config.server.base_url}/api/discs`, data).then(res => res.data)
  },
}
