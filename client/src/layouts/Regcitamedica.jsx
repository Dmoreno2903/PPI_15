import img_registro from "../images/img_registro.jpg"
import {styled} from "styled-components";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { getAllIps } from "../api/ips_api";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-hot-toast";
import { createUser } from "../api/usuario_api";
import { createCita } from "../api/cita_api";


export default function Registro(){
    // Obtener el usuario que se está buscando desde la URL
    const paramUser = useParams();

    console.log("El identificador de usuario",paramUser.id);

    const [selectedTipoCita, setSelectedTipoCita] = useState();
    const changeTipoCita = (event) => {
        /* Cambiamos el estado de selectedTipoCita */
        setSelectedTipoCita(event.target.value);
    };


    
    /* Creamos un formulario usando react-hook */
    const {register, handleSubmit} = useForm()

    /* Creamos un navegador para intercambiar entre componentes */
    const navigate = useNavigate();

    /* Guardamos la lista de IPS obtenida */
    const [listIPS, setListIPS] = useState([]);
    /* Guardamos la IPS seleccionada por el usuario */
    const [selectedIPS, setSelectedIPS] = useState();
    const changeIPS = (event) => {
        /* Cambiamos el estado de selectedIPS */
        setSelectedIPS(event.target.value);
    };


    useEffect(() => {
        async function getIPS() {
            /* Solicitamos a la base de datos la lista de IPS */
            const listIPS = await getAllIps()
            setListIPS(listIPS.data)
        }
        getIPS();
    }, []);


 
    const onSubmit = handleSubmit(async (data) => {
        console.log("Creacion cita", paramUser.id);
        data["user"] = paramUser.id;

        console.log("Datos de la cita", data);
        console.log("IPS", data.ips);
        await createCita(data);
        toast.success("Cita registrada con éxito");
        /* Pasa a la ventana de inicio */
        navigate("/ppi_15/ingresar/"+paramUser.id);
    
    });


    return(
        // Agregamos un fragmento de HTML
        <>
        <StyledRegistro>
            <div className="contenedor">
                <div className="target">

                    <div className="cont_image">
                        <img src={img_registro}/>
                    </div>

                    <form className="form" onSubmit={onSubmit}>
                        <h1>Formulario de registro cita medica</h1>
                        <p>Complete todos los campos</p>

                        <select {...register('tipo_cita')} value={selectedTipoCita} onChange={changeTipoCita}>
                            <option value='incorrect'>Seleccione el tipo de cita</option>
                            <option value='Odontológica'>Odontológica</option>
                            <option value='General'>General</option>
                            <option value='Especialista'>Especialista</option>
                            <option value='Exámenes Médicos'>Exámenes Médicos</option>
                        </select>

                        <input
                            type="date"
                            placeholder="Dia cita medica"
                            autoComplete="off"
                            {...register('fecha', { required: true })}
                        />
                                                
                        <input
                            type="time"
                            placeholder="Hora cita medica"
                            autoComplete="off"
                            {...register('hora', { required: true })}
                        />


                        <select {...register('ips')} value={selectedIPS} onChange={changeIPS}>
                            <option value='incorrect'>Seleccione su IPS</option>
                            {listIPS.map((ips) => (
                                <option key={ips.codigo} value={ips.codigo}>
                                    {ips.nombre_prestador}
                                    </option>
                            ))}
                        </select>
                        

                        <button>Cargar cita</button>

                    </form>
                </div>
            </div>
        </StyledRegistro>
        </>
    );
};

// Se crea la constante de estilos dónde se pondrá el código CSS
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
    .political{
        font-weight: bold;
        cursor: pointer;
    }
    
`