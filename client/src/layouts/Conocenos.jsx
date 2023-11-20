import {styled} from "styled-components";
import img_conocenos from "../images/img_conocenos.png"
import github_conocenos from "../images/github_conocenos.png"
import email_conocenos from "../images/email_conocenos.png"
import { useEffect } from "react";
import Axios from 'axios'

export default function Conocenos(){

    return(
        <>
        <Conocenos_styled>
            <div className="contenedor">
                <div className="items">
                    <h1>Conócenos</h1>
                    <h2>Descripción</h2>
                    <div className="description">
                        <p className="text_description">
                        MediMinder es un sistema diseñado para facilitar a los pacientes 
                        que buscan atención médica urgente en la ciudad de Medellín la 
                        recomendación de una ruta confiable y eficiente. 
                        El objetivo principal es asegurar un acceso rápido y efectivo al centro 
                        de salud más apropiado según las necesidades de atención médica 
                        del paciente y su clasificación en el triage
                        </p>
                        <img src={img_conocenos} className="img_conocenos"/>
                    </div>  
                    <h2>Funcionalidades</h2>
                    <div className="funcionalidades">
                        <div className="funcionalidad">
                            <h3>Recomendación de Ruta</h3>
                            <p>MediMinder analiza la ubicación del paciente y su estado 
                                de salud para recomendar la ruta más conveniente al centro 
                                de salud más apropiado
                                </p>
                        </div>
                        <div className="funcionalidad">
                            <h3>Triage Personalizado</h3>
                            <p>El sistema utiliza un sistema de triage para evaluar la 
                                gravedad de la situación y priorizar la atención médica 
                                en función de la información proporcionada por el usuario
                                </p>
                        </div>
                        <div className="funcionalidad">
                            <h3>Información de Centros de Salud</h3>
                            <p>MediMinder proporciona información detallada sobre los 
                                centros de salud disponibles en la ciudad, 
                                incluyendo tiempos de espera estimados y servicios disponibles
                                </p>
                        </div>
                        <div className="funcionalidad">
                            <h3>Notificaciones en Tiempo Real</h3>
                            <p>Los usuarios recibirán notificaciones en tiempo real sobre 
                                el estado de su ruta y cualquier cambio en la disponibilidad 
                                de los centros de salud
                                </p>
                        </div>
                    </div>
                    <h2>Desarrolladores</h2>
                    <div className="desarrolladores">
                        <div className="desarrollador">
                            <h3>Cesar Augusto Ospina Muñoz</h3>
                            <div className="info">
                                <img src={github_conocenos} className="info_image"/>
                                <p className="info_title">@Cesar-580</p>
                            </div>
                            <div className="info">
                                <img src={email_conocenos} className="info_image"/>
                                <p className="info_title">caospinamu@unal.edu.co</p>
                            </div>
                        </div>
                        <div className="desarrollador">
                            <h3>Juan Diego Aguirre Moreno</h3>
                            <div className="info">
                                <img src={github_conocenos} className="info_image"/>
                                <p className="info_title">@Dmoreno2903</p>
                            </div>
                            <div className="info">
                                <img src={email_conocenos} className="info_image"/>
                                <p className="info_title">jaguirremo@unal.edu.co</p>
                            </div>
                        </div>
                        <div className="desarrollador">
                            <h3>Sergio Andrés Arias Jiménez</h3>
                            <div className="info">
                                <img src={github_conocenos} className="info_image"/>
                                <p className="info_title">@Hoid14</p>
                            </div>
                            <div className="info">
                                <img src={email_conocenos} className="info_image"/>
                                <p className="info_title">sarias@unal.edu.co</p>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
            <div className="contenedor_recursos">
                <h1>Recursos Médicos</h1>
                <div className="recursos">
                    <a className="card_recurso" href="https://www.osjera.com.ar/post/actualizar-datos/10-consejos-para-brindar-primeros-auxilios">Primeros auxilios</a>
                    <a className="card_recurso" href="https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019">Brote de enfermedad por coronavirus (COVID-19)</a>
                    <a className="card_recurso" href="https://www.who.int/es/news-room/fact-sheets/detail/influenza-(seasonal)?gclid=Cj0KCQiA3uGqBhDdARIsAFeJ5r2UYXSSsqwkGfGh0KaPFP56rZvfxT_Wpos4r0eda1-zN9myKiWN7ikaAq4mEALw_wcB">Tratamiento y prevención - Síntomas de gripe estacional</a>
                    <a className="card_recurso" href="https://www.google.com/search?q=cuidarse+de+la+gripe&sca_esv=41e86dab2fc6fc34&sxsrf=AM9HkKmBwZdYo70vXBbuZTLfxE-prsKR9Q%3A1700344563604&ei=8zJZZZS7JJmOwbkP7cWv-Ac&ved=0ahUKEwjUgNaNxc6CAxUZRzABHe3iC38Q4dUDCBA&uact=5&oq=cuidarse+de+la+gripe&gs_lp=Egxnd3Mtd2l6LXNlcnAiFGN1aWRhcnNlIGRlIGxhIGdyaXBlMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5IqTNQtQZY1TJwBXgBkAEAmAG4AaAB7RmqAQQwLjIxuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICChAjGIAEGIoFGCfCAgQQIxgnwgIOEC4YgAQYsQMYxwEY0QPCAggQABiABBixA8ICDhAuGIAEGIoFGLEDGIMBwgILEC4YgAQYxwEY0QPCAgsQABiABBixAxiDAcICChAAGIAEGIoFGEPCAgUQABiABMICDhAAGIAEGIoFGLEDGIMBwgILEC4YgwEYsQMYgATCAhAQABiABBiKBRixAxiDARhDwgILEC4YgAQYsQMYgwHCAg0QABiABBiKBRixAxhDwgIHEAAYgAQYCsICBRAuGIAEwgIKEAAYgAQYFBiHAsICCxAuGIAEGMcBGK8BwgIKEAAYgAQYRhj5AcICIRAAGIAEGEYY-QEYlwUYjAUY3QQYRhj0Axj1Axj2A9gBAeIDBBgAIEGIBgGQBgi6BgYIARABGBM&sclient=gws-wiz-serp#:~:text=H%C3%A1bitos%20saludables%20para%20protegerse%20de%20la%20influenza%20%7C%20CDC">Hábitos saludables para protegerse de la influenza | CDC</a>
                    <a className="card_recurso" href="https://www.minsalud.gov.co/Paginas/Recomendaciones%20para%20evitar%20y%20tratar%20enfermedades%20respiratorias%20en%20esta%20temporada%20de%20lluvias.aspx">Recomendaciones para evitar y tratar enfermedades respiratorias en esta temporada de lluvias</a>
                </div>
            </div>
        </Conocenos_styled>
        </>
    );
}

// Se crea la constante de estilo la cuál contendrá todo el código CSS
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
        width: 80%;
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
    p{
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
    .contenedor_recursos{
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        border-radius: 15px;
        width: 80%;
        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    }
    h1{
        font-size: 2vw;
        margin: 2vh;
        color: #081A40;
    }
    .recursos{
        width: 80%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        align-items: center;
        border: 1px solid #081A40;
        border-radius: 15px;
        margin: 0px 0px 5vh 0px;
    }
    .card_recurso{
        justify-content: center;
        width: 80%;
        border: 1px solid #0B4FD9;
        border-radius: 15px;
        font-size: 1vw;
        margin: 2vh;
        color: #081A40;
        text-decoration: None;
        padding: 2vh;
    }
    .card_recurso:hover{
        background-color: #0B4FD9;
        color: #FFFFFF;
    }
`