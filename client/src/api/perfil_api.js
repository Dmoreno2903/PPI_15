import axios from 'axios'

const perfilApi = axios.create({
    baseURL: 'http://localhost:8000/api/perfil-usuario/',
});

export const getAllUser = () => perfilApi.get('/');

export const createPerfil = (perfil) => perfilApi.post('/', perfil);

export const obtenerPerfilUsuario = (numero_identificacion) => perfilApi.get(`/${numero_identificacion}/`);

export const updatePerfil = (id, data) => perfilApi.put(`/${id}/`, data);