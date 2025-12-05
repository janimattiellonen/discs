import axios from 'axios';
import { Manufacturer } from '../types';

export default {
    getManufacturers(): Promise<Manufacturer[]> {
        return axios
            .get<Manufacturer[]>(
                `https://testdb-8e20.restdb.io/api/manufacturers?apikey=${process.env.REACT_APP_RESTDB_API_KEY}`,
            )
            .then((res) => res.data);
    },
};
