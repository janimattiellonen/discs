import axios from 'axios';

import { createQueryString } from '../util/restDbQuery';

export default {
    getDiscs({ query, filter, limit, offset, order }) {
        const queryString = createQueryString({ query, filter, limit, offset, order });

        return axios
            .get(
                `https://testdb-8e20.restdb.io/rest/discs?metafields=true&apikey=5e98ae5a436377171a0c24a0&${queryString}`,
            )
            .then((res) => {
                return res.data;
            });
    },

    getStats() {
        return axios.get(`https://www-testdb-8e20.restdb.io/stats`).then((res) => {
            return res.data;
        });
    },
};
