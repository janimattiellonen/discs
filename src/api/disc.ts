import axios, { AxiosResponse } from 'axios';

import { createQueryString } from '../util/restDbQuery';
import { Disc, DiscFormData } from '../types';

import { removeImage } from './image';

interface GetDiscsParams {
    query?: unknown; // TODO: Type properly with DiscQuery from restDbQuery
    limit?: number;
    offset?: number;
    order?: {
        column: string;
        mode: string;
    };
}

interface GetDiscsResponse {
    data: Disc[];
    total?: number;
}

export default {
    getDisc(id: string): Promise<AxiosResponse<Disc>> {
        return axios.get<Disc>(
            `https://testdb-8e20.restdb.io/rest/discs/${id}?metafields=true&apikey=${process.env.REACT_APP_RESTDB_API_KEY}`,
        );
    },
    getDiscs({ query, limit, offset, order }: GetDiscsParams): Promise<GetDiscsResponse> {
        const queryString = createQueryString({
            query,
            limit,
            offset,
            order,
        });

        return axios
            .get<GetDiscsResponse>(
                `https://testdb-8e20.restdb.io/rest/discs?metafields=true&apikey=${process.env.REACT_APP_RESTDB_API_KEY}&${queryString}`,
            )
            .then((res) => res.data);
    },

    getStats(): Promise<unknown> {
        // TODO: Type properly - stats response structure
        return axios.get('https://www-testdb-8e20.restdb.io/stats').then((res) => res.data);
    },

    getData(): Promise<unknown> {
        // TODO: Type properly - data response structure
        return axios.get('https://www-testdb-8e20.restdb.io/data').then((res) => res.data);
    },

    addDisc(data: DiscFormData, token: string): Promise<AxiosResponse<Disc>> {
        return axios.post<Disc>('https://testdb-8e20.restdb.io/rest/discs', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    updateDisc(id: string, data: Partial<DiscFormData>, token: string): Promise<AxiosResponse<Disc>> {
        return axios.put<Disc>(`https://testdb-8e20.restdb.io/rest/discs/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    async removeImageFromDisc(id: string, imageId: string, token: string): Promise<AxiosResponse | null> {
        const disc = await this.getDisc(id);

        if (disc.data.id && disc.data.image) {
            await removeImage(imageId, token);
            const images = Array.isArray(disc.data.image) ? disc.data.image : [disc.data.image];

            disc.data.image = images.filter((image: string) => image !== imageId);
            return axios.patch(
                `https://testdb-8e20.restdb.io/rest/discs/${id}`,
                { image: images },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        }

        return null;
    },
};
