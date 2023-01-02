import axios from 'axios';

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

export const uploadImage = (formData, token) => {
    console.log('Foppa: ' + JSON.stringify(formData, null, 2));
    return axios
        .post('https://testdb-8e20.restdb.io/media?apikey=5e98ae5a436377171a0c24a0', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            return res.data;
        });
};
