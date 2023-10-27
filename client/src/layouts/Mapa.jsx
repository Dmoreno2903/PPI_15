import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { useEffect, useRef, useState } from "react";

const center = { lat: 6.274655, lng: -75.5926907 } // Fix the variable name

function calculateRoute() {
  if 

}


export default function Mapa() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [direccionResponse, setDireccion] = useState("")
  const [distance, setDistance] = useState("")

  const originRef = useRef()
  const destinationRef = useRef()


  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    console.log("Mapa cargado")
  }

  return (
    <div style={{ height: '700px' }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        >
        aaa

        { /* Child components, such as markers, info windows, etc. */}
        <Marker position={center} />

      </GoogleMap>
    </div>
  );
}
