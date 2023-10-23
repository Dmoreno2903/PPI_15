import React, { useEffect, useState } from 'react';
import { getAllIps } from '../api/ips_api';
import styled from 'styled-components';

const InformacionStyled = styled.div`
  .detalle-ips {
    margin-top: 20px;
    border: 2px solid #0B4FD9;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table, th, td {
    border: 1px solid #0B4FD9;
  }

  th, td {
    padding: 8px;
    text-align: left;
  }

  input {
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
    margin-right: 2vh;
    width: 50%;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
    color: #0B4FD9;
  }
  button {
    font-weight: bold;
    background-color: #0B4FD9;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1vw;
    cursor: pointer;
    padding: 0.5em 1vw;
    transition: background-color 0.3s, color 0.3s;
  }

  button:hover {
    background-color: white;
    color: #0B4FD9;
  }

  .listado-nombres {
    margin-top: 20px;
  }
`;

function InformacionIPS() {
  const [ips, setIps] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [ipSeleccionada, setIpSeleccionada] = useState(null);
  const [mostrarListado, setMostrarListado] = useState(false);

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener la lista de IPs
    getAllIps()
      .then(response => {
        setIps(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de IPs:', error);
      });
  }, []);

  const realizarBusqueda = () => {
    // Buscar una IP cuyo nombre del prestador coincida con el término de búsqueda
    const ipCoincidente = ips.find(ip => ip.nombre_prestador.toLowerCase() === terminoBusqueda.toLowerCase());
    setIpSeleccionada(ipCoincidente);
    setMostrarListado(false); // Ocultar el listado al seleccionar un nombre
  };

  const manejarCambioBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const manejarEnvioBusqueda = (e) => {
    e.preventDefault();
    realizarBusqueda();
  };

  const manejarMostrarListado = () => {
    setMostrarListado(true);
    setIpSeleccionada(null);
  };

  return (
    <>
      <InformacionStyled>
        <div className="informacion-ips">
          <form onSubmit={manejarEnvioBusqueda}>
            <input
              type="text"
              placeholder="Buscar por nombre del prestador"
              value={terminoBusqueda}
              onChange={manejarCambioBusqueda}
            />
            <button type="submit">Buscar</button>
          </form>
          <button onClick={manejarMostrarListado}>Listar Nombres</button>

          {!ipSeleccionada && mostrarListado && (
            <div className="listado-nombres">
              <h2>Listado de IPS</h2>
              <table>
                <tbody>
                  {ips.map(ip => (
                    <tr key={ip.codigo} onClick={() => setIpSeleccionada(ip)}>
                      <td>{ip.nombre_prestador}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {ipSeleccionada && (
            <div className="detalle-ips">
              <h2>Información del Prestador</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Código:</td>
                    <td>{ipSeleccionada.codigo}</td>
                  </tr>
                  <tr>
                    <td>Nombre del Prestador:</td>
                    <td>{ipSeleccionada.nombre_prestador}</td>
                  </tr>
                  <tr>
                    <td>NIT:</td>
                    <td>{ipSeleccionada.nit}</td>
                  </tr>
                  <tr>
                    <td>Naturaleza:</td>
                    <td>{ipSeleccionada.naturaleza}</td>
                  </tr>
                  <tr>
                    <td>Dirección:</td>
                    <td>{ipSeleccionada.direccion}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{ipSeleccionada.email}</td>
                  </tr>
                  <tr>
                    <td>Teléfono:</td>
                    <td>{ipSeleccionada.telefono}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </InformacionStyled>
    </>
  );
}

export default InformacionIPS;