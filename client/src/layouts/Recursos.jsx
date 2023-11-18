import {styled} from "styled-components";

export default function Recursos(){
    return(
        <>
        <Recursos_styled>
            <div className="contenedor">
                <h1>Recursos Médicos</h1>
                <div className="recursos">
                    <a className="card_recurso" href="https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019">Brote de enfermedad por coronavirus (COVID-19)</a>
                    <a className="card_recurso" href="https://www.who.int/es/news-room/fact-sheets/detail/influenza-(seasonal)?gclid=Cj0KCQiA3uGqBhDdARIsAFeJ5r2UYXSSsqwkGfGh0KaPFP56rZvfxT_Wpos4r0eda1-zN9myKiWN7ikaAq4mEALw_wcB">Tratamiento y prevención - Síntomas de gripe estacional</a>
                    <a className="card_recurso" href="https://www.google.com/search?q=cuidarse+de+la+gripe&sca_esv=41e86dab2fc6fc34&sxsrf=AM9HkKmBwZdYo70vXBbuZTLfxE-prsKR9Q%3A1700344563604&ei=8zJZZZS7JJmOwbkP7cWv-Ac&ved=0ahUKEwjUgNaNxc6CAxUZRzABHe3iC38Q4dUDCBA&uact=5&oq=cuidarse+de+la+gripe&gs_lp=Egxnd3Mtd2l6LXNlcnAiFGN1aWRhcnNlIGRlIGxhIGdyaXBlMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5IqTNQtQZY1TJwBXgBkAEAmAG4AaAB7RmqAQQwLjIxuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICChAjGIAEGIoFGCfCAgQQIxgnwgIOEC4YgAQYsQMYxwEY0QPCAggQABiABBixA8ICDhAuGIAEGIoFGLEDGIMBwgILEC4YgAQYxwEY0QPCAgsQABiABBixAxiDAcICChAAGIAEGIoFGEPCAgUQABiABMICDhAAGIAEGIoFGLEDGIMBwgILEC4YgwEYsQMYgATCAhAQABiABBiKBRixAxiDARhDwgILEC4YgAQYsQMYgwHCAg0QABiABBiKBRixAxhDwgIHEAAYgAQYCsICBRAuGIAEwgIKEAAYgAQYFBiHAsICCxAuGIAEGMcBGK8BwgIKEAAYgAQYRhj5AcICIRAAGIAEGEYY-QEYlwUYjAUY3QQYRhj0Axj1Axj2A9gBAeIDBBgAIEGIBgGQBgi6BgYIARABGBM&sclient=gws-wiz-serp#:~:text=H%C3%A1bitos%20saludables%20para%20protegerse%20de%20la%20influenza%20%7C%20CDC">Hábitos saludables para protegerse de la influenza | CDC</a>
                    <a className="card_recurso" href="https://www.minsalud.gov.co/Paginas/Recomendaciones%20para%20evitar%20y%20tratar%20enfermedades%20respiratorias%20en%20esta%20temporada%20de%20lluvias.aspx">Recomendaciones para evitar y tratar enfermedades respiratorias en esta temporada de lluvias</a>
                </div>
            </div>
        </Recursos_styled>
        </>
    );
}

const Recursos_styled = styled.div`
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;

    .contenedor{
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