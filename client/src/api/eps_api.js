import axios from 'axios'

const userApi = axios.create({
    baseURL: 'http://localhost:8000/api/eps/',
});

export const getAllEps = () => userApi.get('/');

export const createEps = (eps) => userApi.post('/', eps);