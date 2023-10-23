import {styled} from "styled-components";
import img_registro from "../images/img_registro.jpg"
import {useForm} from 'react-hook-form'
import { useEffect, useState } from "react";
import { createUser } from "../api/users_api";
import {useNavigate} from 'react-router-dom'
import { getAllEps } from "../api/eps_api";
import {toast} from "react-hot-toast";

export default function Registro(){

    const [selectedEPS, setselectedEPS] = useState();
    const handleSelectChangeEPS = (event) => {
        setselectedEPS(event.target.value);
    };

    /* Se muestran las opciones en el select EPS*/
    const [listEPS, setlistEPS] = useState([]);

    /* GET de todas las eps desde la base de datos*/
    useEffect(() => {
        async function getEPS() {
            const list_eps = await getAllEps();
            setlistEPS(list_eps.data)
        }
        getEPS();
    }, []);

    /* Se listan los géneros y se muestran en el select*/
    const list_generos = ['Masculino', 'Femenino', 'Otro'];

    const [selectedGenero, setSelectedGenero] = useState('');
    const handleSelectChangeGenero = (event) => {
        setSelectedGenero(event.target.value);
    };

    /* Se toma la información del form y se guarda en la base de datos */
    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data) => {
        if(data){
            await createUser(data);
            // navigate("/ppi_15/");
            window.location.href = "/ppi_15/";
            toast.success("Registro éxitoso");
        }        
    });

    return(
        <>
        <Registro_styled>
            <div className="contenedor">
                <div className="image">
                    <img src={img_registro}/>
                </div>
                <div className="formulario">
                    <form onSubmit={onSubmit} autoComplete="off">
                        <h2>Formulario de registro</h2>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            autoComplete="off"
                            maxlength="50"
                            {...register('name', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Documento de identidad"
                            autoComplete="off"
                            maxlength="10"
                            {...register('id', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Número de contacto"
                            autoComplete="off"
                            maxlength="10"
                            {...register('contacto', { required: true })}
                        />

                        <input
                            type="email"
                            placeholder="Correo electrónico"x
                            autoComplete="off"
                            maxlength="254"
                            {...register('email', { required: true })}
                        />

                        <select {...register('eps')} value={selectedEPS} onChange={handleSelectChangeEPS}>
                            <option value="">Seleccione una EPS</option>
                            {listEPS.map((eps) => (
                                <option key={eps.nit} value={eps.codigo}>
                                    {eps.entidad}
                                </option>
                            ))}
                        </select>

                        <select {...register('genero')} value={selectedGenero} onChange={handleSelectChangeGenero}>
                            <option value=''>Seleccione su género</option>
                            {list_generos.map((genero, index) => (
                                <option key={index} value={genero}>
                                    {genero}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Usuario"
                            autoComplete="off"
                            maxlength="20"
                            {...register('usuario', { required: true })}
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            autoComplete="off"
                            maxlength="20"
                            {...register('password', { required: true })}
                        />
                        
                        <h3>Contacto de emergencia</h3>
                        <input 
                            type="text"
                            placeholder="Nombre completo"
                            autoComplete="off"
                            maxlength="50"
                            {...register('name_emergencia', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Número de contacto"
                            autoComplete="off"
                            maxlength="10"
                            {...register('contacto_emergencia', { required: true })}
                        />
                        
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
        font-size: 2vw;
        margin-top: 5vh;
        color: #0B4FD9;
    }
    h3{
        margin-bottom: 2vh;
        margin-top: 0vh;
        color: #0B4FD9;
        font-size: 1.5vw;
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

    label{
        color: #0B4FD9;
        font-size: 1.5vw;
    }

    .politica{
        margin-bottom: 3vh;
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