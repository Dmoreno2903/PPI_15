import styled from "styled-components";
import img_registro from "../images/img_registro.jpg"

export default function Registro(){
    return(
        <>
        <Registro_styled>
            <div className="contenedor">
                <div className="image">
                    <img src={img_registro}/>
                </div>
                <div className="formulario">
                    <form>
                        <h2>Formulario de registro</h2>
                        <input type="text" name="name" placeholder="Nombre completo"
                        autoComplete="off" required></input>

                        <input type="text" name="id" placeholder="Documento de identidad"
                        autoComplete="off" required></input>

                        <input type="text" name="number" placeholder="Número de contacto"
                        autoComplete="off" required></input>

                        <input type="email" name="email" placeholder="Correo electrónico"
                        autoComplete="off" required></input>

                        <select name="eps">
                            <option value="EPS1">EPS1</option>
                            <option value="EPS2">EPS2</option>
                            <option value="EPS3">EPS3</option>
                        </select>

                        <select name="genero">
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <input type="text" name="username" placeholder="Usuario"
                        autoComplete="off" required></input>

                        <input type="password" name="password" placeholder="Contraseña"
                        autoComplete="off" required></input>
                        
                        <h3>Contacto de emergencia</h3>
                        <input type="text" name="name" placeholder="Nombre completo"
                        autoComplete="off" required></input>

                        <input type="text" name="id" placeholder="Número de contacto"
                        autoComplete="off" required></input>
                        
                        <div className="politica">
                            <input type="checkbox"></input>
                            <label>Acepto la politica de tratamiento de datos personales</label>
                        </div>

                        <button>Registrarse</button>
                    </form>
                </div>
            </div>
        </Registro_styled>
        </>
    );
}

const Registro_styled = styled.div`
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;

    .contenedor{
        border-radius: 15px;
        display: flex;
        width: 70%;
        height: 100%;
        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    }

    .image{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }

    img{
        width: 95%;
        height: auto;
    }

    .formulario{
        width: 50%;
        text-align: center;
    }

    form{
        display: grid;
        width: 80%;
    }

    h2{
        margin-top: 5vh;
        color: #0B4FD9;
    }
    h3{
        margin-bottom: 2vh;
        margin-top: 0vh;
        color: #0B4FD9;
    }

    input{
        text-align: center;
        font-size: 1rem;
        background-color: rgba(242, 242, 242, 0.7);
        color: #0B4FD9;
        border: 1px solid #0B4FD9;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 2vh;
    }
    input:focus{
        outline: none;
    }
    input::placeholder {
        color: #0B4FD9;
    }

    select{
        text-align: center;
        font-size: 1rem;
        background-color: rgba(242, 242, 242, 0.7);
        color: #0B4FD9;
        border: 1px solid #0B4FD9;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 2vh;
    }
    select:focus{
        outline:none;
    }

    label{
        color: #0B4FD9;
        font-size: 1.1rem;
    }

    .politica{
        margin: 2vh;
    }

    button{
        margin-bottom: 5vh;
        font-weight: bold;
        background-color: #0B4FD9;
        color: white;
        padding: 10px 40px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #0B4FD9;
    }
    button:hover{
        background-color: white;
        color: #0B4FD9;
        border: 1px solid #0B4FD9;
    }

`