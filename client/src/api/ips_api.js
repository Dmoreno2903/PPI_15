/**
 * Módulo que contiene funciones para realizar operaciones relacionadas con las 
 * Instituciones Prestadoras de Servicios de Salud (IPS) mediante peticiones a la API.
 * Utiliza la biblioteca axios para gestionar las solicitudes HTTP.
 *
 * @module ips_api
 */
import axios from 'axios'

/**
 * Instancia de axios preconfigurada para realizar peticiones a la API de IPS.
 * La URL base está establecida en 'https://mediminder-e6ow.onrender.com/api/ips/'.
 *
 * @type {Object}
 * @property {Function} get - Función para realizar una solicitud GET para obtener todas las IPS.
 */
const IPSAPI = axios.create({
    // baseURL: 'http://localhost:3000/api/ips/',
    baseURL: 'https://mediminder-e6ow.onrender.com/api/ips/',
});

/**
 * Obtiene todas las Instituciones Prestadoras de Servicios 
 * de Salud (IPS) disponibles haciendo una solicitud GET a la API.
 *
 * @function
 * @returns {Promise<Object>} Promesa que se resuelve con los datos de todas las IPS.
 * @throws {Error} Si la solicitud GET no es exitosa.
 */
export const getAllIps = () => IPSAPI.get('/');