import { styled } from "styled-components";
import { useEffect } from "react";
import { getAllCitas } from "../api/cita_api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

 
export default function Calendario() {
    // La navegacion
    const navigate = useNavigate();

     const [citasUser, setCitas] = useState([]);
    // Obtener el usuario que se está buscando desde la URL
     const paramUser = useParams();

     useEffect(() => {
         getNotes();
     }, []);
 
     async function getNotes() {
         const citas = await getAllCitas();
         var existe = false;
         var citas_usuario = {};
        var cont = 0;
         for (const cita of citas.data) {
             if (cita.user === paramUser.id) {
                 existe = true;
                 citas_usuario [cont]= cita;
cont += 1;
             }
         }
 
         if (existe) {
        console.log(citas_usuario);
        setCitas(citas_usuario)
        }else{
        console.log("no tiene");
        }

        
     }

     // Para crear el perfil
     const onSubmit = async (event) => {
        navigate(`/ppi_15/ingresar/${paramUser.id}`);
    };
 
     return (
        <CalendarioS>
          <div className="contenedor">
            <div className="items">
              <h1>Estas son las citas que tiene proximamente</h1>
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Tipo de Cita</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    {/* <th>Usuario</th> */}
                    {/* Agrega más columnas según la estructura de tus datos */}
                  </tr>
                </thead>
      
                <tbody>
                  {Object.values(citasUser).map((cita) => (
                    <tr key={cita.codigo}>
                      <td>{cita.codigo}</td>
                      <td>{cita.tipo_cita}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      {/* <td>{cita.ips}</td> */}
                      {/* Agrega más celdas según la estructura de tus datos */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <form onSubmit={onSubmit}>
            <button className="button">Volver.</button>
            </form>
          </div>
        </CalendarioS>
      );
} 


// Se crea la constante de estilo la cuál contendrá todo el código CSS
const CalendarioS = styled.div`
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
        color: #081A40
    }

    h2 {
        font-size: 1.5rem; /* Adjust font size for better readability */
        margin: 0px;
        color: #081A40
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
        background-color: #081A40;
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
        background-color: #081A40
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
        background-color: #081A40
    }

    .info_image {
        width: 1.5rem; /* Adjust image size for better readability */
        height: auto;
    }
    .button{
        font-size: 1.5vw;
        font-weight: bold;
        background-color: #081A40;
        color: #fff;
        margin: 1vh 2vw 3vh 2vw;
        padding: 1vh 1vw;
        border: 0px;
        border-radius: 10px
    }
    .button:hover{
        color: #FFFFFF;
        background-color: #0B4FD9;
    }
`;