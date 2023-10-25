import img_registro from "../images/img_registro.jpg"
import {styled} from "styled-components";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { getAllEps } from "../api/eps_api";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { createUser } from "../api/usuario_api";

export default function Registro(){

    /* Guardamos la lista de EPS obtenida */
    const [listEPS, setListEPS] = useState([]);

    
    useEffect(() => {
        async function getEPS() {
            /* Solicitamos a la base de datos la lista de EPS */
            const listEPS = await getAllEps()
            setListEPS(listEPS.data)
        }
        getEPS();
    }, []);

    /* Guardamos la EPS seleccionada por el usuario */
    const [selectedEPS, setSelectedEPS] = useState();
    const changeEPS = (event) => {
        /* Cambiamos el estado de selectedEPS */
        setSelectedEPS(event.target.value);
    };


    /* Guardamos la lista de generos */
    const listGENEROS = ["Masculino", "Femenino", "Otro"];

    /* Guardamos el género seleccionado por el usuario */
    const [selectGENERO, setSelectedGENERO] = useState();
    const changeGENERO = (event) => {
        /* Cambiamos el estado de selectedGENERO */
        setSelectedGENERO(event.target.value);
    };


    /* Guardamos el valor del checkbox */
    const [checkbox, setCheckbox] = useState(false);
    const changeCHECKBOX = (event) => {
        /* Cambiamos el estado del checkbox */
        setCheckbox(event.target.checked);
    }

    /* Creamos un formulario usando react-hook */
    const {register, handleSubmit} = useForm()

    /* Creamos un navegador para intercambiar entre componentes */
    const navigate = useNavigate();
 
    const onSubmit = handleSubmit(async (data) => {
        
        /* Obtenemos los valores de género y de EPS */
        const { eps } = data;
        const { genero } = data;

        /* Válidamos que género y EPS se hayan seleccionado */
        if (eps == 'incorrect' || genero == 'incorrect') {
            /* Mostramos una alerta */
            toast.error("Complete todos los campos");
        }
        else {
            /* Válidamos si el checkbox fue checkeado */
            if(checkbox) {
                /* Creamos el usuario y lo pasamos a la base de datos */
                await createUser(data);
                /* Pasa a la ventana de inicio */
                navigate("/ppi_15/");
                /* Confirma el registro éxitoso */
                toast.success("Registro éxitoso");
            }
            else {
                /* Mostramos una alerta */
                toast.error("Acepte la politica de tratamiento");
            }
        }
    });  

    return(
        <>
        <StyledRegistro>
            <div className="contenedor">
                <div className="target">

                    <div className="cont_image">
                        <img src={img_registro}/>
                    </div>

                    <form className="form" onSubmit={onSubmit}>
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
                        
                        <select {...register('eps')} value={selectedEPS} onChange={changeEPS}>
                            <option value='incorrect'>Seleccione su EPS</option>
                            {listEPS.map((eps) => (
                                <option key={eps.nit} value={eps.codigo}>
                                    {eps.entidad}
                                    </option>
                            ))}
                        </select>

                        <select {...register('genero')} value={selectGENERO} onChange={changeGENERO}>
                            <option value='incorrect'>Seleccione su género</option>
                            {listGENEROS.map((genero, index) => (
                                <option key={index} value={genero}>
                                    {genero}
                                </option>
                            ))}
                        </select>

                        <div className="tratamiento_datos">
                            <input
                                type="checkbox"
                                checked={checkbox}
                                onChange={changeCHECKBOX}
                            />
                            <p>
                                Acepto la politica de tratamiento de datos
                            </p>
                        </div>

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
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
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
        margin: 3vh 0px 0px 0px;
        color: #081A40;
    }
    .form p{
        font-size: 1.5vw;
        margin: 0px 0px 0px 0px;
        text-align: center;
        margin: 1vh 2vw;
        color: #081A40;
    }
    .form input{
        font-size: 1.5vw;
        margin: 5px 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 5px;
        color: #081A40;
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
        margin: 5px 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 5px;
        color: #081A40;
    }
    .form select:hover{
        border: 1px solid gray;
    }
    .form select:focus{
        outline: none;
        border: 1px solid gray;
    }

    .tratamiento_datos{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2vh 2vw;
    }
    .tratamiento_datos input{
        margin-right: .5vw;
    }
    .tratamiento_datos p{
        margin: 0px;
        font-size: 1.5vw;
    }

    .form button{
        font-size: 1.5vw;
        font-weight: bold;
        background-color: #081A40;
        color: #fff;
        margin: 1vh 2vw 3vh 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 10px
    }
    .form button:hover{
        color: #FFFFFF;
        background-color: #0B4FD9;
    }
    
`