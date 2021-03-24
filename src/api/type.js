import axios from 'axios'

export default {
  getTypes() {
    return axios.get(`https://testdb-8e20.restdb.io/api/types?apikey=5e98ae5a436377171a0c24a0`).then(res => res.data)
  },
}
