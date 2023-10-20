import {styled} from "styled-components";
import img_conocenos from "../images/img_conocenos.png"
import github_conocenos from "../images/github_conocenos.png"
import email_conocenos from "../images/email_conocenos.png"

export default function Conocenos(){
    return(
        <>
        <Conocenos_styled>
            <div className="contenedor">
                <div className="items">
                    <h1>Conócenos</h1>
                    <h2>Descripción</h2>
                    <div className="description">
                        <text className="text_description">
                        MediMinder es un sistema diseñado para facilitar a los pacientes 
                        que buscan atención médica urgente en la ciudad de Medellín la 
                        recomendación de una ruta confiable y eficiente. 
                        El objetivo principal es asegurar un acceso rápido y efectivo al centro 
                        de salud más apropiado según las necesidades de atención médica 
                        del paciente y su clasificación en el triage
                        </text>
                        <img src={img_conocenos} className="img_conocenos"/>
                    </div>  
                    <h2>Funcionalidades</h2>
                    <div className="funcionalidades">
                        <div className="funcionalidad">
                            <h3>Recomendación de Ruta</h3>
                            <text>MediMinder analiza la ubicación del paciente y su estado 
                                de salud para recomendar la ruta más conveniente al centro 
                                de salud más apropiado
                                </text>
                        </div>
                        <div className="funcionalidad">
                            <h3>Triage Personalizado</h3>
                            <text>El sistema utiliza un sistema de triage para evaluar la 
                                gravedad de la situación y priorizar la atención médica 
                                en función de la información proporcionada por el usuario
                                </text>
                        </div>
                        <div className="funcionalidad">
                            <h3>Información de Centros de Salud</h3>
                            <text>MediMinder proporciona información detallada sobre los 
                                centros de salud disponibles en la ciudad, 
                                incluyendo tiempos de espera estimados y servicios disponibles
                                </text>
                        </div>
                        <div className="funcionalidad">
                            <h3>Notificaciones en Tiempo Real</h3>
                            <text>Los usuarios recibirán notificaciones en tiempo real sobre 
                                el estado de su ruta y cualquier cambio en la disponibilidad 
                                de los centros de salud
                                </text>
                        </div>
                    </div>
                    <h2>Desarrolladores</h2>
                    <div className="desarrolladores">
                        <div className="desarrollador">
                            <h3>Cesar Augusto Ospina Muñoz</h3>
                            <div className="info">
                                <img src={github_conocenos} className="info_image"/>
                                <text className="info_title">@Cesar-580</text>
                            </div>
                            <div className="info">
                                <img src={email_conocenos} className="info_image"/>
                                <text className="info_title">caospinamu@unal.edu.co</text>
                            </div>
                        </div>
                        <div className="desarrollador">
                            <h3>Juan Diego Aguirre Moreno</h3>
                            <div className="info">
                                <img src={github_conocenos} className="info_image"/>
                                <text className="info_title">@Dmoreno2903</text>
                            </div>
                            <div className="info">
                                <img src={email_conocenos} className="info_image"/>
                                <text className="info_title">jaguirremo@unal.edu.co</text>
                            </div>
                        </div>
                        <div className="desarrollador">
                            <h3>Sergio Andrés Arias Jiménez</h3>
                            <div className="info">
                                <img src={github_conocenos} className="info_image"/>
                                <text className="info_title">@Hoid14</text>
                            </div>
                            <div className="info">
                                <img src={email_conocenos} className="info_image"/>
                                <text className="info_title">sarias@unal.edu.co</text>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </Conocenos_styled>
        </>
    );
}

const Conocenos_styled = styled.div`
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;

    .contenedor{
        border-radius: 15px;
        width: 70%;
        height: 100%;
        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    }
    h1{
        font-size: 2vw;
        margin: 1vh;
        color: #081A40;
    }
    h2{
        font-size: 1.5vw;
        margin: 0px;
        color: #081A40;
    }
    .items{
        justify-content: center;
        alig-items: center;
        text-align: center;
        padding: 1.5vw;
    }
    .description{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .text_description{
        padding-left: 4vw;
        font-size: 1.5vw;
        color: #081A40;
    }
    .img_conocenos{
        padding: 2.5vw;
        width: 30vw;
    }
    .funcionalidades{
        margin-top: 2vh;
        margin-right: 2vw;
        margin-left: 2vw;
        margin-bottom: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .desarrolladores{
        margin-top: 2vh;
        margin-right: 2vw;
        margin-left: 2vw;
        margin-bottom: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .funcionalidad{
        background-color: #081A40;
        border-radius: 15px;
        width: 25vw;
        margin: 1vw;
        height: auto;
        padding: 1.5vw;
        display: inline;
        text-align: center;
        alig-items: center;
        justify-content: center;
        color: white;
    }
    .funcionalidad:hover{
        background-color: #0B4FD9;
    }
    h3{
        margin: 0px;
        font-size: 1.5vw;
        margin-bottom: 1vh;
    }
    text{
        margin: 0px;
        font-size: 1vw;
    }
    .desarrollador{
        background-color: #081A40;
        border-radius: 15px;
        width: 30vw;
        margin: 1vw;
        height: auto;
        padding: 1.5vw;
        display: inline;
        text-align: center;
        alig-items: center;
        justify-content: center;
        color: white;
    }
    .desarrollador:hover{
        background-color: #0B4FD9;
    }
    .info{
        display: flex;
        text-align: center;
        alig-items: center;
        justify-content: center;
        margin: 0.5vh;
    }
    .info_image{;
        width: 1.5vw;
        height: auto;
    }
    .info_title{
        padding-left: 0.5vw;
    }
`