import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from 'react-hook-form'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { actualizarUsuario, obtenerUsuario } from "../api/usuario_api";
import { updatePerfil, createPerfil, getPerfilUsuario, getAllPerfil } from "../api/perfil_api";
import password_img from "../images/password.png"

/**
 * Componente funcional que representa la vista del perfil de usuario.
 *
 * @component
 * @returns {JSX.Element} Retorna un elemento JSX que contiene la información y formulario del perfil de usuario.
 */
export default function CambioContra() {
    // La navegacion
    const navigate = useNavigate();

    // Obtener el usuario que se está buscando desde la URL
    const paramUser = useParams();

    // Se guardan los datos consultados en la base de datos Usuario
    const [DataUsuario, setUsuarioBuscado] = useState([]);
    
    // Se guardan los datos consultados en la base de datos Usuario
    const [dataPerfilUsuario, setdataPerfilUsuario] = useState([]);

    /**
   * Función asincrónica que obtiene información del usuario y actualiza el estado del componente.
   *
   * @async
   * @function
   */
    async function getUsuario() {
        const usuarioBuscado = await obtenerUsuario(paramUser.id);
        setUsuarioBuscado(usuarioBuscado.data);
        return usuarioBuscado.data;
    }
    


    useEffect(() => {
        (async () => {
            const user = await getUsuario();
        })()
    }, [paramUser.id]);

    /* Se toma la información del form y se guarda en la base de datos */
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [newPassword, setNewPassword] = useState('')

    const changeInput = ({target}) => {
        setNewPassword(target.value)
    }

    async function changePassword () {
        const changeUser = await obtenerUsuario(paramUser.id)
        const objectUser = changeUser.data
        objectUser.password = newPassword
        console.log(objectUser)
        setNewPassword('')
        actualizarUsuario(paramUser.id, objectUser)
        toast.success('Contraseña cambiada con éxito')
    }

    return (
        <>
            <PerfilStyled>
                <div className="contenedor">
                    <div className="image">
                        <img src={password_img} className="info_image"/>
                    </div>

                    <div className="formulario">

                        <label> Cambiar la contraseña</label>
                        <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={changeInput}></input>
                        <button onClick={changePassword}>CAMBIAR</button>

                    </div>
                </div>
            </PerfilStyled>
        </>
    );
}

const PerfilStyled = styled.div`
    
.contenedor {
    border-radius: 15px;
    display: flex;
    width: auto;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
}

.image{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
}

img{
    width: 100%;
    height: auto;
}


.formulario{
    width: 40%;
    text-align: center;
}

form{
    display: grid;
    width: 80%;
}

.info div {
    height: 200px;
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    background-color: #E4F2E7;
}

h2{
    font-size: 3vw;
    margin-top: 5vh;
    color: #0B4FD9;
}
label{
    margin-bottom: 2vh;
    margin-top: 0vh;
    font-size: 1.5vw;
    color: #0B4FD9;
    font-size: 1.5vw;
}


/* Estilos para la tabla con divs */
.info_especializada {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin: 20px;
    background-color: #E4F2E7;
    font-size: 18px;
}

.info_row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.info_label {
    width: 40%;
    font-weight: bold;
}

.info_value {
    width: 60%;
}

ul {
    list-style: none;
    padding-left: 0;
}

ul li {
    margin-bottom: 5px;
}

.vertical-form {
    padding-top: 30px;
    max-width: 400px;
    margin: 0 auto;
}

.vertical-form label {
    display: block;
    margin-bottom: 8px;
}

.vertical-form input[type="text"],
.vertical-form input[type="tel"],
.vertical-form input[type="email"],
.vertical-form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.vertical-form input[type="radio"] {
    margin-right: 8px;
}

.vertical-form input[type="submit"] {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.vertical-form input[type="submit"]:hover {
    background-color: #0056b3;
}

input{
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
}
input:focus{
    outline: none;
}
input::placeholder {
    color: #0B4FD9;
}
textarea{
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
}
text:focus{
    outline: none;
}
text::placeholder {
    color: #0B4FD9;
}
select{
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
}
select:focus{
    outline:none;
}

button{
    margin-bottom: 5vh;
    font-weight: bold;
    background-color: #0B4FD9;
    color: white;
    padding: 0.5em 1vw;
    border: none;
    border-radius: 8px;
    font-size: 1.5vw;
    cursor: pointer;
    border: 1px solid #0B4FD9;
}
button:hover{
    background-color: white;
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
}

`