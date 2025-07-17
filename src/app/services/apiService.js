import axios from 'axios';

export const getData = async () => {
    const response = await axios.get('/api/data');
    return response.data;
};

export const postData = async (data) => {
    const response = await axios.post('/api/data', data);
    return response.data;
};