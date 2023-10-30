import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const MapaInfo = ({ coordinates }) => {
  useEffect(() => {
    const map = L.map('map').setView(coordinates, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Obtiene la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [position.coords.latitude, position.coords.longitude];

      // Crea la capa de enrutamiento y muestra la ruta
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation), // Ubicación actual
          L.latLng(coordinates), // Coordenadas especificadas
        ],
        routeWhileDragging: true,
        addWaypoints: true, // Permite agregar marcadores de inicio y fin
        createMarker: function (i, waypoint, n) {
          // Cambia el ícono del marcador de inicio a azul y del marcador de fin a rojo
          if (i === 0) {
            return L.marker(waypoint.latLng, {
              icon: blueIcon,
              draggable: true,
            });
          } else if (i === n - 1) {
            return L.marker(waypoint.latLng, {
              icon: redIcon,
              draggable: true,
            });
          }
        },
      }).addTo(map);

      // Puedes centrar el mapa en la ubicación actual si lo deseas
      map.setView(userLocation, 13);
    });

    return () => {
      map.remove();
    };
  }, [coordinates]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapaInfo;

