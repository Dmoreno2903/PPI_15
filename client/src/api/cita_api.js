import axios from 'axios'

const citasAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/citas/',
});

export const getAllCitas = () => citasAPI.get('/');

export const createCita = (cita) => citasAPI.post('/', cita);