import axios from 'axios'

const userApi = axios.create({
    baseURL: 'http://localhost:8000/api/ips/',
    /*baseURL: 'https://mediminder-e6ow.onrender.com/api/ips/',*/
});

export const getAllIps = () => userApi.get('/');

export const createIps = (ips) => userApi.post('/', ips);