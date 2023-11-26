/**
 * Módulo que contiene funciones para realizar operaciones relacionadas con 
 * las Entidades Promotoras de Salud (EPS) mediante peticiones a la API.
 * Utiliza la biblioteca axios para gestionar las solicitudes HTTP.
 *
 * @module eps_api
 */

import axios from 'axios';

/**
 * Instancia de axios preconfigurada para realizar peticiones a la API de EPS.
 * La URL base está establecida en 'https://mediminder-e6ow.onrender.com/api/eps/'.
 *
 * @type {Object}
 * @property {Function} get - Función para realizar una solicitud 
 * GET para obtener todas las EPS.
 */
const EPSAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/eps/',
});

/**
 * Obtiene todas las Entidades Promotoras de Salud (EPS) 
 * disponibles haciendo una solicitud GET a la API.
 *
 * @function
 * @returns {Promise<Object>} Promesa que se resuelve con los datos de todas las EPS.
 * @throws {Error} Si la solicitud GET no es exitosa.
 */
export const getAllEps = () => EPSAPI.get('/');
