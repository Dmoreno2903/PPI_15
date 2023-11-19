import axios from 'axios'

const PerfilAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/perfil/',
});

export const getAllPerfil = () => PerfilAPI.get('/');

export const createPerfil = (triaje) => PerfilAPI.post('/', triaje);

export const getPerfilUsuario = (cedula) => PerfilAPI.get(`/${cedula}/`);

export const updatePerfil = (user, data) => PerfilAPI.put(`/${user}/`, data);