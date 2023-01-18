import axios from 'axios';

/*
export const fetchLatestImages = async (token) => {
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

export const uploadImage = (formData, token) => {
    const response = axios
        .post('https://testdb-8e20.restdb.io/media', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);

    return response;
};
