import axios from 'axios'

const userApi = axios.create({
    baseURL: 'http://localhost:8000/api/users/',
});

export const getAllUsers = () => userApi.get('/');

export const createUser = (user) => userApi.post('/', user);

export const obtenerUsuario = (usuario) => userApi.get(`/${usuario}/`);