import img_registro from "../images/img_registro.jpg"
import {styled} from "styled-components";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { getAllEps } from "../api/eps_api";

export default function Registro(){

    const [listEPS, setListEPS] = useState([]);

    useEffect(() => {
        async function getEPS() {
            const listEPS = await getAllEps()
            setListEPS(listEPS.data)
        }
        getEPS();
    }, []);

    const [selectedEPS, setSelectedEPS] = useState();
    const changeEPS = (event) => {
        setSelectedEPS(event.target.value);
    };


    const listGENEROS = ["Masculino", "Femenino", "Otro"];

    const [selectGENERO, setSelectedGENERO] = useState();
    const changeGENERO = (event) => {
        setSelectedGENERO(event.target.value);
    };

    const {register, handleSubmit} = useForm()    

    return(
        <>
        <StyledRegistro>
            <div className="contenedor">
                <div className="target">

                    <div className="cont_image">
                        <img src={img_registro}/>
                    </div>

                    <form className="form">
                        <h1>Formulario de registro</h1>
                        <p>Complete todos los campos</p>

                        <input
                            type="text"
                            placeholder="Nombres"
                            autoComplete="off"
                            maxLength='30'
                            {...register('name', { required: true })}
                        />
                        
                        <input
                            type="text"
                            placeholder="Apellidos"
                            autoComplete="off"
                            maxLength='30'
                            {...register('last_name', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Número de identidad"
                            autoComplete="off"
                            maxLength='10'
                            {...register('cedula', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Usuario"
                            autoComplete="off"
                            maxLength='20'
                            {...register('usuario', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Contraseña"
                            autoComplete="off"
                            maxLength='20'
                            {...register('password', { required: true })}
                        />
                        
                        <select {...register('eps')}>
                            <option>Seleccione su EPS</option>
                        </select>

                        <select {...register('genero')}>
                            <option>Seleccione su género</option>
                        </select>

                        <button>Registrarse</button>

                    </form>
                </div>
            </div>
        </StyledRegistro>
        </>
    );
};

const StyledRegistro  = styled.div`
    .contenedor{
        background-color: #E5E7E9;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .target{
        background-color: #FDFEFE;
        border-radius: 20px;
        width: 80%;
        display: flex;
    }

    .cont_image{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }
    .cont_image img{
        width: 100%;
        border-radius: 20px 0px 0px 20px;
    }

    .form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        aling-items: center;
        width: 50%;
    }
    .form h1{
        font-size: 2vw;
        margin: 0px 0px 0px 0px;
        text-align: center;
        margin: 3vh 0px 0px 1vh;
    }
    .form p{
        font-size: 1.5vw;
        margin: 0px 0px 0px 0px;
        text-align: center;
        margin: 1vh 2vw;
    }
    .form input{
        font-size: 1.5vw;
        margin: 1vh 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 5px
    }
    .form input:hover{
        border: 1px solid gray;
    }
    .form input:focus{
        outline: none;
        border: 1px solid gray;
    }

    .form select{
        font-size: 1.5vw;
        margin: 1vh 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 5px
    }
    .form select:hover{
        border: 1px solid gray;
    }
    .form select:focus{
        outline: none;
        border: 1px solid gray;
    }

    .form button{
        font-size: 1.5vw;
        font-weight: bold;
        background-color: #0B4FD9;
        color: #fff;
        margin: 1vh 2vw 3vh 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 10px
    }
    .form button:hover{
        border: 1px solid #0B4FD9;
        background-color: #FFF;
        color: #0B4FD9; 
    }
    
`