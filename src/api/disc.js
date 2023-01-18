import axios from 'axios';

import { createQueryString } from '../util/restDbQuery';

export default {
    getDisc(id) {
        return axios.get(
            `https://testdb-8e20.restdb.io/rest/discs/${id}?metafields=true&apikey=${process.env.REACT_APP_RESTDB_API_KEY}`,
        );
    },
    getDiscs({ query, filter, limit, offset, order }) {
        const queryString = createQueryString({
            query,
            filter,
            limit,
            offset,
            order,
        });

        return axios
            .get(
                `https://testdb-8e20.restdb.io/rest/discs?metafields=true&apikey=${process.env.REACT_APP_RESTDB_API_KEY}&${queryString}`,
            )
            .then((res) => res.data);
    },

    getStats() {
        return axios.get('https://www-testdb-8e20.restdb.io/stats').then((res) => res.data);
    },

    getData() {
        return axios.get('https://www-testdb-8e20.restdb.io/data').then((res) => res.data);
    },

    addDisc(data, token) {
        return axios.post('https://testdb-8e20.restdb.io/rest/discs', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    updateDisc(id, data, token) {
        return axios.put(`https://testdb-8e20.restdb.io/rest/discs/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
