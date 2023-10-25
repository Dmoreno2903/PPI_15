import axios from 'axios'

const PerfilAPI = axios.create({
    baseURL: 'http://localhost:8000/api/perfil/',
});

export const getAllPerfil = () => PerfilAPI.get('/');

export const createPerfil = (triaje) => PerfilAPI.post('/', triaje);

export const getPerfilUsuario = (cedula) => PerfilAPI.get(`/${cedula}/`);

export const updatePerfil = (cedula, data) => PerfilAPI.put(`/${cedula}/`, data);