import axios from 'axios'

const triageApi = axios.create({
    baseURL: 'http://localhost:8000/api/triage/',
});

// export const getAllUser = () => triageApi.get('/');

export const createTriage = (data) => triageApi.post('/', data);