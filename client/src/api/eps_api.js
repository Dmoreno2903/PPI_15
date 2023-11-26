import axios from 'axios'

const EPSAPI = axios.create({
    // baseURL: 'http://localhost:3000/api/eps/',
    baseURL: 'https://mediminder-e6ow.onrender.com/api/eps/',
});

export const getAllEps = () => EPSAPI.get('/');