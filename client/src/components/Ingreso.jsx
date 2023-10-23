import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllUsers } from "../api/users_api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Ingreso() {

    // Obtener el usuario que se está buscando desde la URL
    const { id } = useParams();

    const [isLogin, setIsLogin] = useState(false);

    const [visible, setVisible] = useState(true);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();

    /* Obtenemos todos los usuarios */
    useEffect(() => {
        async function getUsers() {
            const users = await getAllUsers();
            setUsers(users.data);
        }
        getUsers();
    }, []);

    /* Obtenemos el valor introducido en el input usuario*/
    const [usuarioValue, setUsuarioValue] = useState('');
    const handleUsuarioChange = (event) => {
        setUsuarioValue(event.target.value);
    }
    /* Obtenemos el valor introducido en el input password*/
    const [passwordValue, setPasswordValue] = useState('');
    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value);
    }

    const navigate = useNavigate();



    // Login    
    const onSubmit = () => {
        let userExist = false;
        users.forEach(function (user) {
            if (user.usuario === usuarioValue && user.password) {
                userExist = true;
                setUser(user);
                setIsLogin(true);
                // navigate("/ppi_15/ingresar/" + user.usuario);
                navigate(`/ppi_15/ingresar/${user.id}`);
            }
        })

        if (userExist) {
            setUsuarioValue('');
            setPasswordValue('');
            setVisible(false);
            // navigate("/ppi_15/ingresar");
            // navigate("/ppi_15/ingresar/" + user.usuario);
        }
        else {
            setUsuarioValue('');
            setPasswordValue('');
            toast.error("Usuario o contraseña incorrecta")
        }
    };

    const handleExit = () => {
        setVisible(true);
        navigate("/ppi_15/");
    }

    useEffect(() => {
        if (id && !isLogin) {
            users.forEach(function (user) {
                if (user.id === id) {
                    console.log(user);
                    setUser(user);
                    setIsLogin(true);
                    setVisible(false);
                    navigate(`/ppi_15/ingresar/${user.id}`);
                }
            })
        }
    }, [id, users]);

    return (
        <>
            <HeaderStyled>
                {visible ? <div>
                    <Link to={"/ppi_15/"}>Inicio</Link>
                    <Link to={"/ppi_15/informacion"}>Información</Link>
                    <Link to={"/ppi_15/conocenos"}>Conócenos</Link>
                    <Link to={"/ppi_15/registro"}>Registro</Link>

                    <button onClick={onSubmit}>Entrar</button>

                    <input
                        type="text"
                        placeholder='Ingrese su usuario'
                        maxLength="20"
                        value={usuarioValue}
                        onChange={handleUsuarioChange}
                    />

                    <input
                        type="text"
                        placeholder='Contraseña'
                        maxLength="20"
                        value={passwordValue}
                        onChange={handlePasswordChange}
                    />
                </div> : <div>
                    <Link to={"/ppi_15/ingresar"}>{user.usuario}</Link>
                    <button onClick={handleExit}>Salir</button>
                </div>}
            </HeaderStyled></>
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