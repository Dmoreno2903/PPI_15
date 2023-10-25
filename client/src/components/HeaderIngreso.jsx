import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Ingreso() {

    const [visible, setVisible] = useState(true)

    return (
        <>
            <HeaderStyled>
                {visible ? <div>
                    <Link to={"/ppi_15/"}>Inicio</Link>
                    <Link to={"/ppi_15/informacion"}>Información</Link>
                    <Link to={"/ppi_15/conocenos"}>Conócenos</Link>
                    <Link to={"/ppi_15/registro"}>Registro</Link>

                    <button>Entrar</button>

                    <input
                        type="text"
                        placeholder='Ingrese su usuario'
                        maxLength="20"
                    />

                    <input
                        type="text"
                        placeholder='Contraseña'
                        maxLength="20"
                    />
                </div> : <div>
                    <Link to={"/ppi_15/ingresar"}></Link>
                    <button>Salir</button>
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