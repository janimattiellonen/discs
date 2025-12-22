import axios from 'axios';
import { Manufacturer } from '../types';

export default {
    getManufacturers(): Promise<Manufacturer[]> {
        return axios
            .get<
                Manufacturer[]
            >(`https://testdb-8e20.restdb.io/api/manufacturers?apikey=${import.meta.env.VITE_RESTDB_API_KEY}`)
            .then((res) => res.data);
    },
};
