import axios from 'axios'

import { createQueryString } from '../util/restDbQuery'

export default {
  getDiscs({ query, filter, limit, offset, order }) {
    const queryString = createQueryString({ query, filter, limit, offset, order })

    return axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/rest/discs?metafields=true&apikey=${process.env.REACT_APP_API_KEY}&${queryString}`
      )
      .then(res => {
        return res.data
      })
  },

  getStats() {
    return axios.get(`${process.env.REACT_APP_STATS_BASE_URL}/stats`).then(res => {
      return res.data
    })
  },
}
