import axios from 'axios';

export default {
    getManufacturers() {
        return axios
            .get(`https://testdb-8e20.restdb.io/api/manufacturers?apikey=${process.env.REACT_APP_RESTDB_API_KEY}`)
            .then((res) => res.data);
    },
};
