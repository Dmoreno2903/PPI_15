import axios from 'axios'

const userApi = axios.create({
    baseURL: 'http://https://mediminder-e6ow.onrender.com/api/users/:8000/api/eps/',
});

export const getAllEps = () => userApi.get('/');

export const createEps = (eps) => userApi.post('/', eps);