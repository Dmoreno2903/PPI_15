// Importaciones de módulos necesarios
import Axios from 'axios'
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

// Definición de constantes y estados iniciales
const center = { lat: 6.274655, lng: -75.5926907 }

export default function Mapa() {
  // Este componente renderiza un mapa de Google Maps con 
  // una ruta desde un origen (Lugar donde está el paciente) a 
  // un destino calculado por el sistema (Centro de salud recomendado)
  // El destino se calcula a partir de los datos de ubicación de los centros de salud
  // obtenidos desde la API de MediMinder en el backend (Django)

  // Carga de la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  
  // Estados para las respuestas de direcciones, distancia, duración y destino seleccionado
  // Respuesta de direcciones
  const [directionsResponse, setDirectionsResponse] = useState('')
  // Distancia de la ruta
  const [distance, setDistance] = useState('')
  // Duración de la ruta
  const [duration, setDuration] = useState('')
  // Destino seleccionado
  const [selectedDestination, setSelectedDestination] = useState(1)

  // Estado para almacenar los datos de destino obtenidos de Axios
  const [destinationData, setDestinationData] = useState([])

  // Origen de las direcciones
  const origin = { lat: 6.274655, lng: -75.5926907 }

  // Solicitar datos de destino a la API de MediMinder en el backend
  useEffect(() => {
    // Petición POST a la API de MediMinder en el backend
    Axios.post('http://localhost:8000/api/ips/filtro/')
      .then(response => {
        // Extracción de destinos válidos de la respuesta de Axios
        const ipsValidas = response.data.ips_validas;

        // Mapeo de destinos válidos al formato deseado
        const destinations = ipsValidas.map((ip, index) => ({
          lat: Number(ip.latitud),
          lng: Number(ip.longitud),
        }));

        // Almacenamiento de los destinos en el estado
        setDestinationData(destinations);
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error al procesar los datos', error);
      });
  }, []);

  // Función asincrónica para calcular la ruta desde el origen al destino seleccionado
  async function calculateRoute() {
    // Carga de la API de Google Maps
    const directionsService = new window.google.maps.DirectionsService()
    // Cálculo de la ruta
    // El destino se calcula a partir de los datos de ubicación de los centros de salud
    const results = await directionsService.route({
      // Parámetros de la ruta
      origin: origin,
      destination: destinationData[selectedDestination - 1], 
      travelMode: window.google.maps.TravelMode.DRIVING,
    })

    // Actualización de estados con los resultados de la ruta
    setDirectionsResponse(results)
    // La distancia de la ruta se obtienen de los resultados de la ruta
    setDistance(results.routes[0].legs[0].distance.text)
    // La duración de la ruta se obtienen de los resultados de la ruta
    setDuration(results.routes[0].legs[0].duration.text)
  }

  // Se calcula la ruta cada vez que se selecciona un destino
  useEffect(() => {
    calculateRoute()
  }, [selectedDestination, destinationData]);

  // Comprobación de carga de Google Maps API
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Renderizado del mapa y botones de selección de destino
  return (
    <div style={{ height: '700px' }}>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
        <Marker position={center} />
        <DirectionsRenderer directions={directionsResponse} />
      </GoogleMap>

      {/* Renderización de botones basados en los datos recibidos de Axios */}
      {destinationData.map((destination, index) => (
        <button key={index} onClick={() => setSelectedDestination(index + 1)}>
          Ruta {index + 1}
        </button>
      ))}
    </div>
  )
}
