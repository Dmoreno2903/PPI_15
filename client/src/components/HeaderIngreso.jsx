import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllUsers } from "../api/usuario_api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Ingreso() {

    /* Tomamos el parametro de la barra de direcciones */
    const params = useParams();

    /* Lista dónde se guardarán todos los usuarios */
     const [listaUsuarios, setListaUsuarios] = useState([]);
     useEffect(() => {
        async function getUsuarios() {
            /* Obtenemos todos los usuarios de la base de datos */
            const listaUsuarios = await getAllUsers();
            /* Pasamos la lista obtenida al array */
            setListaUsuarios(listaUsuarios.data); 
        };
        getUsuarios()
     }, [params]);

     /* Guardamos los datos ingresados en usuario y contraseña */
     const [usuarioField, setUsuarioField] = useState('');
     const [passwordField, setPasswordField] = useState('');

     const changeUsuario = (event) => {
        /* Guardamos el valor ingresado en el campo usuario */
        setUsuarioField(event.target.value);
     };
     const changePassword = (event) => {
        /* Guardamos el valor ingresado en el campo password */
        setPasswordField(event.target.value);
     };

     /* Variable que decide que div mostrar */
     const [isLogin, setIsLogin] = useState(true);

     /* Seleccionamos el usuario */
     const [user, setUser] = useState();

     /* Creamos el navigate para entrar al perfil */
     const navigate = useNavigate();

     const login = () => {
        /* Función para iniciar sesión */

        /* Variable */
        let usuario_exist = false;
        let usuario;

        /* Se itera sobre todos los usuarios */
        listaUsuarios.map((value, index) => {
            /* Buscamos el usuario cuyo "usuario" y "password" coincidan */
            if(value.usuario === usuarioField && value.password === passwordField) {
                usuario_exist = true;
                usuario = value;
            }
        });

        if (usuario_exist == true) {
            /* Guardamos el usuario */
            setUser(usuario);

            /* Limpiamos el formulario */
            setUsuarioField('');
            setPasswordField('');

            /* Ocultamos el formulario */
            setIsLogin(false);

            /* Abrimos el perfil del usuario */
            navigate(`/ppi_15/ingresar/${usuario.usuario}`);
        }
        else{
            /* Limpiamos el formulario */
            setUsuarioField('');
            setPasswordField('');

            /* Mostramos una alerta */
            toast.error("Usuario o contraseña incorrectas");
        }
     };

     const exit = () => {
        /* Función para cerrar sesión */
        navigate('/ppi_15/');

        /* Cambiamos el estado de la variable isLogin */
        setIsLogin(true)
     }
    
    return (
        <>
        <HeaderStyled>
            {isLogin ? 
                <div>
                <Link to={"/ppi_15/"}>Inicio</Link>
                <Link to={"/ppi_15/informacion"}>Información</Link>
                <Link to={"/ppi_15/conocenos"}>Conócenos</Link>
                <Link to={"/ppi_15/registro"}>Registro</Link>

                <button onClick={login}>Entrar</button>

                <input
                    type="text"
                    placeholder='Usuario'
                    maxLength="20"
                    value={usuarioField}
                    onChange={changeUsuario}
                />

                <input
                    type="password"
                    placeholder='Contraseña'
                    maxLength="20"
                    value={passwordField}
                    onChange={changePassword}
                />
                </div> 
                : 
                <div>
                    <Link to={"/ppi_15/ingresar"}>{user.usuario}</Link>
                    <button onClick={exit}>Salir</button>
                </div>}
        </HeaderStyled>
        </>
    )
}

const HeaderStyled = styled.div`
    
    h2{
        font-size: 1.5vw;
        color: white;
        font-weight: 500;
        span{
        font-weight: bold;
        }
    }

    a{
        font-size: 1.1vw;
        color: white;
        text-decoration: none;
        margin-right: 1.5rem;
    }
    a:hover{
        font-size: 1.2vw;
    }

    button{
        font-weight: bold;
        background-color: #0B4FD9;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1vw;
        cursor: pointer;
        padding: 0.5em 1vw;
    }
    button:hover{
        background-color: white;
        color: #0B4FD9;
    }

    input{
        text-align: center;
        font-size: 1.1vw;
        margin-left: 1rem;
        background-color: rgba(242, 242, 242, 0.6);
        color: #fff;
        opacity: 1;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 0.5em 0vw;
    }
    input:focus{
        outline: none;
    }
    input::placeholder {
        color: #fff;
    }
`