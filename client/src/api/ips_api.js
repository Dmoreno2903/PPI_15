import axios from 'axios'

const IPSAPI = axios.create({
    baseURL: 'http://localhost:3000/api/ips/',
});

export const getAllIps = () => IPSAPI.get('/');