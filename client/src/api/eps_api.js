import axios from 'axios'

const EPSAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/eps/',
});

export const getAllEps = () => EPSAPI.get('/');