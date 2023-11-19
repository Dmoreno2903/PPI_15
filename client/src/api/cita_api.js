import axios from 'axios'

const citasAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/citas/',
});

export const getAllCitas = () => citasAPI.get('/');

export const createCita = (cita) => citasAPI.post('/', cita);