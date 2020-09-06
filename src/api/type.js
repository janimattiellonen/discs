import axios from 'axios'

import config from '../config.client'

export default {
  getTypes() {
    return axios.get(`${config.server.base_url}/api/types?apikey=5e98ae5a436377171a0c24a0`).then(res => res.data)
  },
}
