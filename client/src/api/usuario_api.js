import axios from 'axios'

const UsuarioAPI = axios.create({
    baseURL: 'http://localhost:8000/api/usuario/',
});

export const getAllUsers = () => UsuarioAPI.get('/');

export const createUser = (user) => UsuarioAPI.post('/', user);

export const obtenerUsuario = (usuario) => UsuarioAPI.get(`/${usuario}/`);