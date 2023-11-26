/**
 * Módulo que contiene funciones para realizar operaciones relacionadas 
 * con perfiles de usuarios mediante peticiones a la API.
 * Utiliza la biblioteca axios para gestionar las solicitudes HTTP.
 *
 * @module perfil_api
 */
import axios from 'axios'

/**
 * Instancia de axios preconfigurada para realizar peticiones 
 * a la API de perfiles de usuarios.
 * La URL base está establecida en 'https://mediminder-e6ow.onrender.com/api/perfil/'.
 *
 * @type {Object}
 * @property {Function} get - Función para realizar una solicitud GET 
 * para obtener todos los perfiles de usuarios.
 * @property {Function} post - Función para realizar una solicitud 
 * POST para crear un nuevo perfil de usuario.
 * @property {Function} getPerfilUsuario - Función para realizar 
 * una solicitud GET para obtener el perfil de un usuario específico.
 * @property {Function} updatePerfil - Función para realizar una 
 * solicitud PUT para actualizar el perfil de un usuario específico.
 */
const PerfilAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/perfil/',
});

export const getAllPerfil = () => PerfilAPI.get('/');

export const createPerfil = (triaje) => PerfilAPI.post('/', triaje);

export const getPerfilUsuario = (cedula) => PerfilAPI.get(`/${cedula}/`);

export const updatePerfil = (user, data) => PerfilAPI.put(`/${user}/`, data);