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

    getData() {
        return axios.get(`https://www-testdb-8e20.restdb.io/data`).then((res) => res.data);
    },

    addDisc() {
        return axios.post(
            'https://testdb-8e20.restdb.io/rest/discs',
            {
                manufacturer: 'Innova',
                name: 'Mako3',
                //type: 'midrange',
            },
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrWTFOVUl6UmtRNU5FWTJSRUk0UVRCRE5qRkdOamM0TURCQ05rWkZPVEUyTWtORU5UYzFSZyJ9.eyJnaXZlbl9uYW1lIjoiSmFuaW1hdHRpIiwiZmFtaWx5X25hbWUiOiJFbGxvbmVuIiwibmlja25hbWUiOiJqYW5pbWF0dGkuZWxsb25lbiIsIm5hbWUiOiJKYW5pbWF0dGkgRWxsb25lbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA2eWQtd2FmYjhxOFBhaFY5OUo3d0J5bzNNVVRoeTd0dHdnam5SSFZRPXM5Ni1jIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMi0yOVQwOToyODoyNS4xMjJaIiwiZW1haWwiOiJqYW5pbWF0dGkuZWxsb25lbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9teWRpc2NzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4Mjg1MjI0ODIzNzU5NjI1MCIsImF1ZCI6Ijh0T3JwWWhORXpyZ2tFV1pNaVBjVzNLVFhhbDN0ZnlEIiwiaWF0IjoxNjcyMzE4Nzk1LCJleHAiOjE2NzIzNTQ3OTUsInNpZCI6InVKeWR6dllvZnBnakxWNmZ5OWUzREl3ek44ZzgwcXhaIiwibm9uY2UiOiJNazFtU1RCaFNYSXlRVlZ1U1Y5UWIwbHZMbXhsTVd0dU4zbFRkSEptVVdNMlNtcDZkMTloTGxKRmVRPT0ifQ.sQEp7Mys2nHXy2Gs04xEJsJsXLp2V-MkMzcKjxTyERZxjtzZi4IoA_sl48V_T42U5IL3z-_X9vwJu4AO6uKCs_iDP9c83EE27cHVsefwTiSxT1hFp9b_OGbB7PzTW9fBI-S_TDFPVTd9Nf8lRimse6ZrASw1rbihrZE2dWijw4P2F9lxFInnzXBQYAA2Cz-DZZTuu0cH9p5VDCIlscrgiyKUYj_Y7IzWfjiy2l_7IsNo8uSV39fivWR9J49TvoLnnYrbVWUlIdH_uRfFb8dBvjN4pRCgAW1EIrCzgkTZD1JbKJPF8y-oSfI8jjduY5LWT--Bdddf40nwjRpQXE6V3w',
                },
            },
        );
    },
};
