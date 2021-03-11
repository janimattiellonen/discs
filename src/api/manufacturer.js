import axios from 'axios'

export default {
  getManufacturers() {
    return axios.get(`${process.env.BASE_URL}/api/manufacturers?apikey=5e98ae5a436377171a0c24a0`).then(res => res.data)
  },
}
