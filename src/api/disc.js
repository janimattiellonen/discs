import axios from 'axios'

import config from '../config.client'

import { createQueryString } from '../util/restDbQuery'

export default {
  getDiscs({ query, filter, limit, offset, order }) {
    const queryString = createQueryString({ query, filter, limit, offset, order })

    console.log(`QS: ${queryString}*`)
    return axios
      .get(`${config.server.base_url}/rest/discs?metafields=true&apikey=${config.server.api_key}&${queryString}`)
      .then(res => {
        return res.data
      })
  },

  getStats() {
    return axios.get(`${config.server.rest_base_url}/stats`).then(res => {
      return res.data
    })
  },
}
