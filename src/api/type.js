import axios from 'axios';

export const getTypes = () => axios.get('https://www-testdb-8e20.restdb.io/data').then((res) => res.data);
