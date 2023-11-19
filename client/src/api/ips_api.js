import axios from 'axios'

const IPSAPI = axios.create({
    // baseURL: 'http://localhost:3000/api/ips/',
    baseURL: 'https://mediminder-e6ow.onrender.com/api/ips/',
});

export const getAllIps = () => IPSAPI.get('/');