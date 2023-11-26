/**
 * Módulo que contiene funciones para realizar operaciones 
 * relacionadas con usuarios mediante peticiones a la API.
 * Utiliza la biblioteca axios para gestionar las solicitudes HTTP.
 *
 * @module usuario_api
 */
import axios from 'axios'

/**
 * Instancia de axios preconfigurada para realizar 
 * peticiones a la API de usuarios.
 * La URL base está establecida en 'https://mediminder-e6ow.onrender.com/api/usuario/'.
 *
 * @type {Object}
 * @property {Function} get - Función para realizar una 
 * solicitud GET y obtener todos los usuarios.
 * @property {Function} post - Función para realizar una 
 * solicitud POST y crear un nuevo usuario.
 * @property {Function} getUsuario - Función para realizar 
 * una solicitud GET y obtener información de un usuario específico.
 */
const UsuarioAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/usuario/',
});

export const getAllUsers = () => UsuarioAPI.get('/');

export const createUser = (user) => UsuarioAPI.post('/', user);

export const obtenerUsuario = (usuario) => UsuarioAPI.get(`/${usuario}/`);

export const actualizarUsuario = (usuario, object) => UsuarioAPI.put(`/${usuario}/`, object)