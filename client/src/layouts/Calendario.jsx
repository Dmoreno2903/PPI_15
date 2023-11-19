import { styled } from "styled-components";
import img_conocenos from "../images/img_conocenos.png"
import github_conocenos from "../images/github_conocenos.png"
import email_conocenos from "../images/email_conocenos.png"
import { useEffect } from "react";
import Axios from 'axios'
import { getAllNotes } from "../api/notas_api";
import { useState } from "react";


export default function Conocenos() {
    const [notas, setNotas] = useState([]);
    const [promedios, setPromedios] = useState([]);
    const [graphPath, setGraphPath] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.post('https://s10proyect.onrender.com/api/notes/librerias/');
                console.log("Enserio?", response.data.notas_seria);

                if (response.data.graph_path) {
                    setGraphPath(`data:image/png;base64, ${response.data.graph_path}`);
                } else {
                    console.error('El campo graph_path no está presente en la respuesta.');
                }
                const promediosObtenidas = response.data.notas_seria;
                setPromedios(promediosObtenidas);    


                const notasObtenidas = await getNotes();
                setNotas(notasObtenidas);
            } catch (error) {
                console.error('Errores al procesar los datos', error);
            }
        }

        fetchData();
    }, []);

    async function getNotes() {
        const notes = await getAllNotes();
        return notes.data;
    }

    return (
        <Conocenos_styled>
            <div className="contenedor">
                <div className="items">
                    <h1>Así están sus notas</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Materia</th>
                                <th>Nota</th>
                                <th>Semestre</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {notas && notas.map((nota) => (
                                <tr key={nota.id}>
                                    <td>{nota.materia_code}</td>
                                    <td>{nota.note}</td>
                                    <td>{nota.semester}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="funcionalidades">
                        <h1>Promedios</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Semestre</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promedios && promedios.map((promedio) => (
                                    <tr key={promedio.id}>
                                        <td>{promedio.semester}</td>
                                        <td>{promedio.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {/* Renderizar el gráfico */}
                        {graphPath && <img src={graphPath} alt="Promedio de Notas por Materia" />}
                    </div>
                </div>
            </div>
        </Conocenos_styled>
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

    .contenedor {
        border-radius: 15px;
        width: 80%;
        height: 100%;
        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
        margin: auto; /* Center the container */
        padding: 20px; /* Add some padding for better readability */
    }

    h1 {
        font-size: 2rem; /* Adjust font size for better readability */
        margin: 1vh;
        color: #081c15;
    }

    h2 {
        font-size: 1.5rem; /* Adjust font size for better readability */
        margin: 0px;
        color: #081c15;
    }

    .items {
        text-align: center;
        padding: 1.5rem; /* Adjust padding for better readability */
    }

    table {
        width: 100%;
        margin-top: 1.5rem; /* Add some space above the table */
        border-collapse: collapse;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    th,
    td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ddd; /* Add a border between rows */
    }

    th {
        background-color: #081c15;
        color: white;
    }

    tbody tr:hover {
        background-color: #f5f5f5; /* Change background color on hover */
    }

    .funcionalidades {
        margin-top: 2vh;
        margin-bottom: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap; /* Allow items to wrap to the next line if the container is too small */
    }

    .funcionalidad {
        background-color: #081c15;
        border-radius: 15px;
        width: calc(33.33% - 20px); /* 33.33% width with some space between items */
        margin: 1vw;
        height: auto;
        padding: 1.5vw;
        text-align: center;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .funcionalidad:hover {
        background-color: #081c15;
    }

    .info_image {
        width: 1.5rem; /* Adjust image size for better readability */
        height: auto;
    }
`;