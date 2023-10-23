import styled from "styled-components";
import InformacionIPS from "../components/Informacion-IPS";

export default function Información(){
    return(
        <>
        <Informacion_styled>
            <div className="contenedor">
                <h1>Información de IPS</h1>
                <InformacionIPS/>
            </div>
        </Informacion_styled>
        </>
    );
}

const Informacion_styled = styled.div`
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;
    text-align:center;

    h1{
        font-size: 2vw;
        margin-top: 5vh;
        color: #0B4FD9;
    }
    .contenedor{
        border-radius: 15px;
        display: flex;
        flex-direction:column;
        width: 70%;
        height: 600px; 

        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    }
`