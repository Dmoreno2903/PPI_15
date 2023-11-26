/**
 * Módulo que contiene funciones para realizar operaciones 
 * relacionadas con triajes mediante peticiones a la API.
 * Utiliza la biblioteca axios para gestionar las solicitudes HTTP.
 *
 * @module triaje_api
 */

import axios from 'axios'

/**
 * Instancia de axios preconfigurada para 
 * realizar peticiones a la API de triajes.
 * La URL base está establecida en 'https://mediminder-e6ow.onrender.com/api/triaje/'.
 *
 * @type {Object}
 * @property {Function} get - Función para realizar una 
 * solicitud GET para obtener todos los triajes.
 * @property {Function} post - Función para realizar una 
 * solicitud POST para crear un nuevo triaje.
 */
const TriajeAPI = axios.create({
    // baseURL: 'http://localhost:3000/api/triaje/',
    baseURL: 'https://mediminder-e6ow.onrender.com/api/triaje/',
});

export const getAllTriaje = () => TriajeAPI.get('/');

export const createTriaje = (triaje) => TriajeAPI.post('/', triaje);