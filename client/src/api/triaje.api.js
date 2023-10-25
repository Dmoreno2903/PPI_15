import axios from 'axios'

const TriajeAPI = axios.create({
    baseURL: 'http://localhost:8000/api/triaje/',
});

export const getAllTriaje = () => TriajeAPI.get('/');

export const createTriaje = (triaje) => TriajeAPI.post('/', triaje);