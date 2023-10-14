import { Link } from "react-router-dom"
import styled from "styled-components"

function Header() {
    return (
      <><Header_styled>
        <h2>Medi<span>Minder</span></h2>
        <div>
            <Link to={"/ppi_15/"}>Inicio</Link>
            <Link to={"/ppi_15/informacion"}>Información</Link>
            <Link to={"/ppi_15/conocenos"}>Conócenos</Link>
            <Link to={"/ppi_15/registro"}>Registro</Link>
            <Link to={"/ppi_15/ingresar"}>Ingresar</Link>
            {/* <button>Entrar</button> */}

            <input placeholder='Ingrese su usuario'></input>
        </div>
        </Header_styled></>
    )
  }
  
export default Header
  
const Header_styled = styled.nav`
    background-color: #081A40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;

    h2{ 
        color: white;
        font-weight: 600;
        span{
        font-weight: bold;
        }
    }

    a{
        font-size: 1.2em;
        color: white;
        text-decoration: none;
        margin-right: 1.5rem;
    }
    a:hover{
        font-size: 1.3rem;
    }

    button{
        font-weight: bold;
        background-color: #0B4FD9;
        color: white;
        padding: 10px 40px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    button:hover{
        background-color: white;
        color: #0B4FD9;
    }

    input{
        text-align: center;
        font-size: 1em;
        width: 15rem;
        margin-left: 1rem;
        background-color: rgba(242, 242, 242, 0.6);
        color: #fff;
        opacity: 1;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
    }
    input:focus{
        outline: none;
    }
    input::placeholder {
        color: #fff;
    }
`