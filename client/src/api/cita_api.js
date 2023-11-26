/**
 * Módulo que contiene funciones para realizar operaciones relacionadas con citas médicas mediante peticiones a la API.
 * Utiliza la biblioteca axios para gestionar las solicitudes HTTP.
 *
 * @module citas_api
 */
import axios from 'axios'

/**
 * Instancia de axios preconfigurada para realizar peticiones a la API de citas médicas.
 * La URL base está establecida en 'https://mediminder-e6ow.onrender.com/api/citas/'.
 *
 * @type {Object}
 * @property {Function} get - Función para realizar una solicitud GET para obtener todas las citas médicas.
 * @property {Function} post - Función para realizar una solicitud POST para crear una nueva cita médica.
 */

const citasAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/citas/',
});

/**
 * Obtiene todas las citas médicas disponibles haciendo una solicitud GET a la API.
 *
 * @function
 * @returns {Promise<Object>} Promesa que se resuelve con los datos de todas las citas médicas.
 * @throws {Error} Si la solicitud GET no es exitosa.
 */
export const getAllCitas = () => citasAPI.get('/');

/**
 * Crea una nueva cita médica enviando los datos proporcionados a la API mediante una solicitud POST.
 *
 * @function
 * @param {Object} cita - Objeto que contiene los datos de la nueva cita médica.
 * @returns {Promise<Object>} Promesa que se resuelve con los datos de la cita médica recién creada.
 * @throws {Error} Si la solicitud POST no es exitosa.
 */
export const createCita = (cita) => citasAPI.post('/', cita);