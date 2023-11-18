import React, { useEffect, useState } from 'react';
import { getAllIps } from '../api/ips_api';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import MapaInfo from './MapaInfo';


const InformacionStyled = styled.div`
  .detalle-ips {
    margin-top: 20px;
    border: 2px solid #0B4FD9;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .detalle-ips table {
    width: 100px;
    height: 50px;
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
    margin-bottom: 1vh;
    
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

  .contenedor-listado-nombres table{
    margin-top: 20px;
    width: 100%;
    height: 100px;
    border-collapse: collapse;
  }
  .contenedor-tabla-listado{
    overflow: auto;
    height: 400px;
    width: 100%;
  }

  .informacion-ips {
    text-align: center;
    padding: 20px;
  }

  .react-autosuggest__suggestions-list {
    list-style: none;
    padding: 0;
    border: 1px solid #0B4FD9;
    margin: 0;
  }
  
  .suggestion-item {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    
  }

  .suggestion-item:hover {
    background-color: #e0e0e0;
  }
  .form-position {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-container {
    display: flex;
    flex-direction: row;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
  .window-change {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .window-change button {
    margin-right: 20px; 
  }
  .table-row:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
  .contenedor-info-mapa {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly; /* Centrar horizontalmente */
  }
  .contenedor-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contenedor-mapa {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mapa{
    width: 400px;
    height: 400px;
  }
`;

/**
 * Componente que muestra información de IPS (Instituciones Prestadoras de Salud).
 * Permite buscar IPS por nombre y ver detalles de la IPS seleccionada.
 */
function InformacionIPS() {
  const [ips, setIps] = useState([]); // Estado para almacenar la lista de IPS
  const [value, setValue] = useState(''); // Estado para almacenar el valor del input de búsqueda
  const [suggestions, setSuggestions] = useState([]); // Estado para almacenar las sugerencias de búsqueda
  const [ipSeleccionada, setIpSeleccionada] = useState(null); // Estado para almacenar la IPS seleccionada
  const [ventana, setVentana] = useState(); // Estado para controlar la ventana

  /**
   * Función que se ejecuta al cargar el componente.
   * Obtiene la lista de IPS y la almacena en el estado.
   */
  useEffect(() => {
    const fetchIps = async () => {
      try {
        const response = await getAllIps();
        setIps(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de IPs:', error);
      }
    };

    fetchIps();
  }, []);

  /**
   * Función que devuelve las sugerencias de búsqueda según el valor del input.
   * @param {string} inputValue - Valor del input de búsqueda.
   * @returns {Array} - Array de objetos IPS que coinciden con el valor de búsqueda.
   */
  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    const filteredSuggestions = ips.filter((ip) =>
      ip.nombre_prestador.toLowerCase().includes(inputValueLowerCase)
    );
    return filteredSuggestions.slice(0, 5);
  };

  /**
   * Función que se ejecuta al solicitar sugerencias de búsqueda.
   * Actualiza el estado de sugerencias con las sugerencias obtenidas.
   * @param {Object} param - Objeto que contiene el valor del input de búsqueda.
   */
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  /**
   * Función que se ejecuta al limpiar las sugerencias de búsqueda.
   * Actualiza el estado de sugerencias a un array vacío.
   */
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  /**
   * Función que se ejecuta al seleccionar una sugerencia de búsqueda.
   * Actualiza el estado de IPS seleccionada con la IPS seleccionada.
   * Actualiza el valor del input de búsqueda con el nombre de la IPS seleccionada.
   * @param {Object} event - Evento de selección de sugerencia.
   * @param {Object} suggestion - Objeto IPS seleccionado.
   */
  const onSuggestionSelected = (event, { suggestion }) => {
    setIpSeleccionada(suggestion);
    setValue(suggestion.nombre_prestador);
  };

  /**
   * Función que se ejecuta al cambiar el valor del input de búsqueda.
   * Actualiza el estado del valor del input de búsqueda.
   * @param {Object} event - Evento de cambio de valor del input.
   * @param {Object} newValue - Nuevo valor del input de búsqueda.
   */
  const manejarCambioBusqueda = (event, { newValue }) => {
    setValue(newValue);
  };

  /**
   * Función que se ejecuta al enviar el formulario de búsqueda.
   * Busca la IPS que coincide con el valor del input de búsqueda.
   * Actualiza el estado de IPS seleccionada con la IPS encontrada.
   * @param {Object} e - Evento de envío de formulario.
   */
  const manejarEnvioBusqueda = (e) => {
    e.preventDefault();
    const ipCoincidente = ips.find(
      (ip) => ip.nombre_prestador.toLowerCase() === value.toLowerCase()
    );
    if (ipCoincidente) {
      setIpSeleccionada(ipCoincidente);
    }
  };

  /**
   * Función que se ejecuta al hacer clic en el botón "Ventana 1".
   * Cambia el estado de ventana a "busqueda".
   * Limpia el estado de IPS seleccionada.
   */
  const mostrarVentana1 = () => {
    setVentana('busqueda');
    setIpSeleccionada(null);
  };

  /**
   * Función que se ejecuta al hacer clic en el botón "Ventana 2".
   * Cambia el estado de ventana a "listado".
   * Limpia el estado de IPS seleccionada.
   */
  const mostrarVentana2 = () => {
    setVentana('listado');
    setIpSeleccionada(null); // Limpiar la selección
  };

  const mostrarVentana3 = () => {
    setVentana('graficas');
    setIpSeleccionada(null); // Limpiar la selección
  };



  /**
   * Función que se ejecuta al hacer clic en una fila de la tabla de IPS.
   * Actualiza el estado de IPS seleccionada con la IPS seleccionada.
   * Cambia el estado de ventana a "listadoAlt".
   */
  const mostrarListadoAlt = () => {
    setVentana('listadoAlt');
  }

  /**
   * Función que renderiza una sugerencia de búsqueda.
   * @param {Object} suggestion - Objeto IPS a renderizar.
   * @returns {JSX.Element} - Elemento JSX que representa la sugerencia de búsqueda.
   */
  const renderSuggestion = (suggestion) => {
    return (
      <div className="suggestion-item">
        {suggestion.nombre_prestador}
      </div>
    );
  };

  return (
    <InformacionStyled>
      <div className="informacion-ips">
        <div className='window-change'>
          {/* Botones para cambiar entre ventanas */}
          <div>
            <button onClick={mostrarVentana1}
            style={{ backgroundColor: ventana === 'busqueda' ? 'white' : '#0B4FD9', color: ventana === 'busqueda' ? '#0B4FD9' : 'white' }}
            >Busqueda IPS</button>
          </div>
          <div>
            <button onClick={mostrarVentana2}
            style={{ backgroundColor: ventana === 'listado' || ventana === 'listadoAlt' ? 'white' : '#0B4FD9', color: ventana === 'listado' || ventana === 'listadoAlt' ? '#0B4FD9' : 'white' }}
            >Listado IPS</button>
          </div>
          <div>
            <button onClick={mostrarVentana3}
            style={{ backgroundColor: ventana === 'graficas' ? 'white' : '#0B4FD9', color: ventana === 'graficas' ? '#0B4FD9' : 'white' }}
            >Grafica</button>
          </div>
          </div>
        <div className="form-position">
          

          {/* Ventana de búsqueda */}
          {ventana === 'busqueda' && (
            <form className="form-container" onSubmit={manejarEnvioBusqueda}>
              <div className="search-container">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionSelected={onSuggestionSelected}
                  getSuggestionValue={(suggestion) => suggestion.nombre_prestador}
                  renderSuggestion={renderSuggestion}
                  inputProps={{
                    placeholder: 'Buscar por nombre del prestador',
                    value,
                    onChange: manejarCambioBusqueda,
                  }}
                />
              </div>
              <div>
                <button type="submit">Buscar</button>
              </div>
            </form>
          )}

          {/* Ventana de listado */}
          {ventana === 'listado' && (
            <div className="contenedor-listado-nombres">
              <h2>Seleccione una IPS</h2>
              <div className='contenedor-tabla-listado'>
              <table>
                <tbody>
                  {ips
                  .sort((a, b) => a.nombre_prestador.localeCompare(b.nombre_prestador))
                  .map((ip) => (
                    <tr className="table-row" key={ip.codigo} onClick={() => {setIpSeleccionada(ip); mostrarListadoAlt();}}>
                      <td>{ip.nombre_prestador}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
          {ventana === 'graficas' && (
            <div className="contenedor-graficas">
              
            </div>
          )}

          {/* Ventana de listado alternativo*/}
          {ventana === 'listadoAlt' && (
            <div>
              <button onClick={mostrarVentana2}>volver</button>
            </div>
          )}

          
        </div>

        
        {/* Detalles de la IP seleccionada */}
        {ipSeleccionada && (
          <div className="detalle-ips">
            <div className='contenedor-info-mapa'>
            <div className='contenedor-info'>
            <h1>Información del Prestador</h1>
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
            <div className="contenedor-mapa">
            <h1>Mapa</h1>
            <div className='mapa'>
            <MapaInfo coordinates={[parseFloat(ipSeleccionada.latitud), parseFloat(ipSeleccionada.longitud)]} />
            </div>
            </div>
            </div>
            
          </div>
          
        )}
      </div>
    </InformacionStyled>
  );
}

export default InformacionIPS;









