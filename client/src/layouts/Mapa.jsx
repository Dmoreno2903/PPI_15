import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

const center = { lat: 6.274655, lng: -75.5926907 }

export default function Mapa() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [directionsResponse, setDirectionsResponse] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedDestination, setSelectedDestination] = useState(1)

  const origin = { lat: 6.274655, lng: -75.5926907 }
  const destination = {
    1: { lat: 6.2770876, lng: -75.5798086 },
    2: { lat: 6.2789732, lng: -75.5849903 },
    3: { lat: 6.26392, lng: -75.565057 }
  }

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: origin,
      destination: destination[selectedDestination],
      travelMode: window.google.maps.TravelMode.DRIVING,
    })

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  useEffect(() => {
    calculateRoute()
  }, [selectedDestination]) 

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ height: '700px' }}>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={center} />
        <DirectionsRenderer directions={directionsResponse} />
      </GoogleMap>

      <button onClick={() => setSelectedDestination(1)}>Ruta 1</button>
      <button onClick={() => setSelectedDestination(2)}>Ruta 2</button>
      <button onClick={() => setSelectedDestination(3)}>Ruta 3</button>
    </div>
  )
}
