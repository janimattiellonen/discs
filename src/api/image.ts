import axios, { AxiosResponse } from 'axios';

/*
export const fetchLatestImages = async (token: string) => {
  const images = await axios.get(
    'https://testdb-8e20.restdb.io/api/testdb-8e20:self/data/attachments?sort=_id&max=10&dir=-1',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
*/

interface UploadImageResponse {
    id: string;
    url: string;
    [key: string]: unknown; // TODO: Type properly - additional response fields
}

export const uploadImage = (formData: FormData, token: string): Promise<UploadImageResponse> => {
    const response = axios
        .post<UploadImageResponse>('https://testdb-8e20.restdb.io/media', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);

    return response;
};

export const removeImage = (id: string, token: string): Promise<AxiosResponse> =>
    axios.delete(`https://testdb-8e20.restdb.io/rest/discs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
