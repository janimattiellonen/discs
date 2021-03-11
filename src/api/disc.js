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

  getFoo() {
    // // q={"name": {"$regex": "^mako3"}}&h={}&totals=true&count=true
    const queryString = 'q={"name": {"$regex": "^mako3"}}&h={}&totals=true&count=true'

    return axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/rest/discs?metafields=true&apikey=${process.env.REACT_APP_API_KEY}&${queryString}`
      )
      .then(res => {
        return res.data
      })
  },

  getStats() {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/stats`).then(res => {
      return res.data
    })
  },
}
