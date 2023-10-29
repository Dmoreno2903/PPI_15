import React, { useEffect, useState } from 'react';
import { getAllIps } from '../api/ips_api';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';

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

  .listado-nombres {
    margin-top: 20px;
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
`;

function InformacionIPS() {
  const [ips, setIps] = useState([]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ipSeleccionada, setIpSeleccionada] = useState(null);
  const [ventana, setVentana] = useState(); // Estado para controlar la ventana

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

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    const filteredSuggestions = ips.filter((ip) =>
      ip.nombre_prestador.toLowerCase().startsWith(inputValueLowerCase)
    );
    return filteredSuggestions.slice(0, 5);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setIpSeleccionada(suggestion);
    setValue(suggestion.nombre_prestador);
  };

  const manejarCambioBusqueda = (event, { newValue }) => {
    setValue(newValue);
  };

  const manejarEnvioBusqueda = (e) => {
    e.preventDefault();
    const ipCoincidente = ips.find(
      (ip) => ip.nombre_prestador.toLowerCase() === value.toLowerCase()
    );
    if (ipCoincidente) {
      setIpSeleccionada(ipCoincidente);
    }
  };

  // Cambiar a la ventana de búsqueda al hacer clic en el botón "Ventana 1"
  const mostrarVentana1 = () => {
    setVentana('busqueda');
  };

  // Cambiar a la ventana de listado al hacer clic en el botón "Ventana 2"
  const mostrarVentana2 = () => {
    setVentana('listado');
    setIpSeleccionada(null); // Limpiar la selección
  };

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
            style={{ backgroundColor: ventana === 'listado' ? 'white' : '#0B4FD9', color: ventana === 'listado' ? '#0B4FD9' : 'white' }}
            >Listado IPS</button>
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
            <div className="listado-nombres">
              <h2>Listado de IPS</h2>
              <table>
                <tbody>
                  {ips.map((ip) => (
                    <tr key={ip.codigo} onClick={() => setIpSeleccionada(ip)}>
                      <td>{ip.nombre_prestador}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detalles de la IP seleccionada */}
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
  );
}

export default InformacionIPS;



