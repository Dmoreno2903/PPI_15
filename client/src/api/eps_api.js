import axios from 'axios'

const EPSAPI = axios.create({
    // baseURL: 'http://localhost:3000/api/eps/',
    baseURL: 'http://127.0.0.1:8000/api/eps/',
});

export const getAllEps = () => EPSAPI.get('/');