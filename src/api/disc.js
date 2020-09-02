import axios from 'axios'

import config from '../config.client'

import { createQueryString } from '../util/restDbQuery'

export default {
  getDiscs_FAKE() {
    return new Promise(r => r([{ name: 'Mako3' }, { name: 'Teebird' }]))
  },
  getDiscs({ query, filter, limit, offset, order }) {
    const queryString = createQueryString({ query, filter, limit, offset, order })

    console.log(`QS: ${queryString}*`)
    return axios
      .get(
        //`${config.server.base_url}/rest/discs?metafields=true&apikey=${config.server.api_key}&max=${limit}&skip=${offset}&h={"$orderby": {"_created": 1, "name": 1}}`
        `${config.server.base_url}/rest/discs?metafields=true&apikey=${config.server.api_key}&${queryString}`
      )
      .then(res => {
        //console.log('data: ' + JSON.stringify(res, null, 2))
        //return []
        return res.data
      })
  },

  getStats() {
    return axios.get(`${config.server.rest_base_url}/stats`).then(res => {
      // console.log('data: ' + JSON.stringify(res, null, 2))
      return res.data
    })
  },
}
