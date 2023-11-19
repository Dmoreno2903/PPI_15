import axios from 'axios'

const UsuarioAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/usuario/',
});

export const getAllUsers = () => UsuarioAPI.get('/');

export const createUser = (user) => UsuarioAPI.post('/', user);

export const obtenerUsuario = (usuario) => UsuarioAPI.get(`/${usuario}/`);