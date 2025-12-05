import axios from 'axios';
import { DiscType } from '../types';

export const getTypes = (): Promise<DiscType[]> =>
    axios.get<DiscType[]>('https://www-testdb-8e20.restdb.io/data').then((res) => res.data);
