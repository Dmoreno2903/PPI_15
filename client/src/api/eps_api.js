import axios from 'axios'

const userApi = axios.create({
    /*baseURL: 'http://localhost:8000/api/eps/',*/
    baseURL: 'https://mediminder-e6ow.onrender.com/api/eps/',
});

export const getAllEps = () => userApi.get('/');

export const createEps = (eps) => userApi.post('/', eps);