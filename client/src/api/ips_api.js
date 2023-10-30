import axios from 'axios'

const IPSAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/ips/',
});

export const getAllIps = () => IPSAPI.get('/');