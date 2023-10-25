import axios from 'axios'

const IPSAPI = axios.create({
    baseURL: 'http://localhost:8000/api/ips/',
});

export const getAllIPS = () => IPSAPI.get('/');