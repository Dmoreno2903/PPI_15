import axios from 'axios'

const TriajeAPI = axios.create({
    // baseURL: 'http://localhost:3000/api/triaje/',
    baseURL: 'http://127.0.0.1:8000/api/triaje/',
});

export const getAllTriaje = () => TriajeAPI.get('/');

export const createTriaje = (triaje) => TriajeAPI.post('/', triaje);

export const getTriajeGrafica = () => TriajeAPI.get('/grafica/');

export const getEstadisticasTriaje = () => TriajeAPI.get('/estadisticas_triaje/');