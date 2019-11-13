import axios from 'axios'

import config from '../config.client'

export default {
  getDiscs() {
    return axios.get(`${config.server.base_url}/api/discs`).then(res => res.data)
  },

  addDisc(data) {
    console.log('data: ' + JSON.stringify(data))
    return axios.post(`${config.server.base_url}/api/discs`, data).then(res => res.data)
  }
}
