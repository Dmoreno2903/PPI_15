import { styled } from "styled-components";
import img_emergency from "../images/img_emergency.jpg"
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { createUser } from "../api/users_api";
import { useNavigate, useParams } from 'react-router-dom'
import { getAllEps } from "../api/eps_api";
import { toast } from "react-hot-toast";
import { createTriage } from "../api/triage_api";

export default function Emergencia() {
    const usuario_emergencia = useParams();
    // console.log("usuario_emergencia");
    // console.log(usuario_emergencia);

    const navigate = useNavigate();
    // const [selectedEPS, setselectedEPS] = useState();
    // const handleSelectChangeEPS = (event) => {
    //     setselectedEPS(event.target.value);
    // };

    // /* Se muestran las opciones en el select EPS*/
    // const [listEPS, setlistEPS] = useState([]);

    // /* GET de todas las eps desde la base de datos*/
    // useEffect(() => {
    //     async function getEPS() {
    //         const list_eps = await getAllEps();
    //         setlistEPS(list_eps.data)
    //     }
    //     getEPS();
    // }, []);

    // /* Se listan los géneros y se muestran en el select*/
    // const list_generos = ['Masculino', 'Femenino', '39 tipos de gays'];

    // const [selectedGenero, setSelectedGenero] = useState('');
    // const handleSelectChangeGenero = (event) => {
    //     setSelectedGenero(event.target.value);
    // };

    /* Se toma la información del form y se guarda en la base de datos */
    const { register, handleSubmit } = useForm();

    // const navigate = useNavigate();

    function calcularTriage(respuestas) {
        // Triage I
        if (respuestas.respiratoria === "true" || respuestas.traumatismos === "true" || respuestas.quemaduras === "true" || respuestas.perdida === "true" || respuestas.hemorragia === "true" || respuestas.trabajo_parto === "true" || respuestas.abuso_sexual === "true") {
            // return "Triage I (Rojo)";
            return 1;
        }
    
        // Triage II
        if (respuestas.signos_vitales === "true" || respuestas.convulsivo === "true" || respuestas.deficiencia_respiratoria === "true" || respuestas.crisis_hipertensiva === "true") {
            // return "Triage II (Naranja)";
            return 2;
        }
    
        // Triage III
        if (respuestas.fiebre === "true" || respuestas.vertigo === "true" || respuestas.respiratoria === "true") {
            // return "Triage III (Amarillo)";
            return 3;
        }
    
        // Triage IV
        if (respuestas.fiebre === "true" || respuestas.tos_congestion === "true") {
            return 4;
            // return "Triage IV (Verde)";
        }
    
        // Triage V
        if (respuestas.sintomas_agudos === "true" || respuestas.dolor_cabeza_cronico === "true") {
            return 5;
            // return "Triage V (Azul)";
        }
    
        // En caso de respuestas no válidas o desconocidas
        return 0;
        // return "Triage Desconocido";
    }


    const onSubmit = handleSubmit(async (data) => {
        if (data) {

            const body = data;

            // console.log(usuario_emergencia) ;
            const calculed_triage = calcularTriage(body);

            // console.log("calculed_triage");
            // console.log(calculed_triage);

            if (calculed_triage === 1) {
                toast.error("Su triage es de 1 (Rojo)\n¡Se procedera con el calculo de la ruta!");
            }else if (calculed_triage === 2) {
                toast.error("Su triage es de 2 (Naranja)\n¡Se procedera con el calculo de la ruta!");
            }else if (calculed_triage === 3) {
                toast.error("Su triage es de 3 (Amarillo)\n Se redireccionará a la selección de IPS");
            }else if (calculed_triage === 4) {
                toast.error("Su triage es de 4 (Verde)\n Se redireccionará a la selección de IPS");
            }else if (calculed_triage === 5) {
                toast.error("Su triage es de 5 (Azul)\n Se redireccionará a la selección de IPS");
            }else{
                toast.error("Su triage es desconocido");
            }
            // toast.success("Su triage es de ");

            body.triage_calculado = calculed_triage;
            body.usuario = usuario_emergencia.id;
            
            console.log(body);

            await createTriage(body);
            // toast.success("Se modificaron correctamente los datos");
            navigate(`/ppi_15/ingresar/${usuario_emergencia.id}`);
        }
    });


    return (
        <>
            <Registro_styled>
                <div className="contenedor">
                    <div className="image">
                        <img src={img_emergency} />
                    </div>

                    <div className="formulario">
                        <form onSubmit={onSubmit} autoComplete="off">
                            <h2>Triage</h2>
                            <table>
                                <tr>
                                    <td>¿Puede respirar?</td>
                                    <td><input type="radio" name="respiratoria" value= "true" {...register('respiratoria', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="respiratoria" value= "false" {...register('respiratoria', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene traumatismos severos múltiples?</td>
                                    <td><input type="radio" name="traumatismos" value="true" {...register('traumatismos', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="traumatismos" value="false" {...register('traumatismos', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene quemaduras en todo el cuerpo?</td>
                                    <td><input type="radio" name="quemaduras" value="true" {...register('quemaduras', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="quemaduras" value="false" {...register('quemaduras', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Perdió algun miembro u órgano?</td>
                                    <td><input type="radio" name="perdida" value="true" {...register('perdida', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="perdida" value="false" {...register('perdida', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene hemorragia masiva?</td>
                                    <td><input type="radio" name="hemorragia" value="true" {...register('hemorragia', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="hemorragia" value="false" {...register('hemorragia', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Esta presentando trabajo de parto expulsivo?</td>
                                    <td><input type="radio" name="trabajo_parto" value="true" {...register('trabajo_parto', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="trabajo_parto" value="false" {...register('trabajo_parto', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Fue victima de abuso sexual?</td>
                                    <td><input type="radio" name="abuso_sexual" value="true" {...register('abuso_sexual', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="abuso_sexual" value="false" {...register('abuso_sexual', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene alteración aguda de signos vitales?</td>
                                    <td><input type="radio" name="signos_vitales" value="true" {...register('signos_vitales', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="signos_vitales" value="false" {...register('signos_vitales', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Presenta un estado convulsivo?</td>
                                    <td><input type="radio" name="convulsivo" value="true" {...register('convulsivo', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="convulsivo" value="false" {...register('convulsivo', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene deficiencia respiratoria moderada?</td>
                                    <td><input type="radio" name="deficiencia_respiratoria" value="true" {...register('deficiencia_respiratoria', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="deficiencia_respiratoria" value="false" {...register('deficiencia_respiratoria', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Presenta Crisis hipertensiva?</td>
                                    <td><input type="radio" name="crisis_hipertensiva" value="true" {...register('crisis_hipertensiva', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="crisis_hipertensiva" value="false" {...register('crisis_hipertensiva', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene fiebre mayor a 38.5°C?</td>
                                    <td><input type="radio" name="fiebre" value="true" {...register('fiebre', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="fiebre" value="false" {...register('fiebre', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Presenta vértigo severo?</td>
                                    <td><input type="radio" name="vertigo" value="true" {...register('vertigo', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="vertigo" value="false" {...register('vertigo', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene dificultad respiratoria leve?</td>
                                    <td><input type="radio" name="respiratoria_leve" value="true" {...register('respiratoria_leve', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="respiratoria_leve" value="false" {...register('respiratoria_leve', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene tos y congestión?</td>
                                    <td><input type="radio" name="tos_congestion" value="true" {...register('tos_congestion', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="tos_congestion" value="false" {...register('tos_congestion', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>¿Tiene migraña crónica?</td>
                                    <td><input type="radio" name="dolor_cabeza_cronico" value="true" {...register('dolor_cabeza_cronico', { required: true })} /></td>
                                    <td>Sí</td>
                                    <td><input type="radio" name="dolor_cabeza_cronico" value="false" {...register('dolor_cabeza_cronico', { required: true })} /></td>
                                    <td>No</td>
                                </tr>
                            </table>
                            <button>Calcular</button>
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
    input[type="radio"] {
        width: 20px; /* Ancho cuadrado */
        height: 20px; /* Altura cuadrada */
        border-radius: 0; /* Hacer el borde recto en lugar de redondeado */
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2vh;
        padding: 0.5em 1vw;
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