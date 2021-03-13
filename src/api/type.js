import axios from 'axios'

export default {
  getTypes() {
    return axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/types?apikey=5e98ae5a436377171a0c24a0`)
      .then(res => res.data)
  },
}
