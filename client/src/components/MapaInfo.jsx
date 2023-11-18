/*Se supone que esto pide la ubicacion del usuario*/
/*import React, { useEffect } from 'react';
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
*/

// Ubicacion fija

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const MapaInfo = ({ coordinates }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
        center: coordinates,
        zoom: 13,
        dragging: true,
        zoomControl: true,
        doubleClickZoom: 'center',
        boxZoom: false,
        touchZoom: true,
        scrollWheelZoom: true,
      });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentOrigin = { lat: position.coords.latitude, lng: position.coords.longitude };
            setOrigin(currentOrigin);
          },
          (error) => {
            alert("Error: " + error.code + " " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(origin ? [origin.lat, origin.lng] : [0, 0]),
          L.latLng(coordinates),
        ],
        routeWhileDragging: true,
        addWaypoints: false,
        createMarker: function (i, waypoint, n) {
          if (i === 0) {
            return L.marker(waypoint.latLng, {
              icon: blueIcon,
              draggable: false,
            });
          } else if (i === n - 1) {
            return L.marker(waypoint.latLng, {
              icon: redIcon,
              draggable: false,
            });
          }
        },
        lineOptions: {
          styles: [{ clickable: false, draggable: false }],
        },
      });

      routingControl.addTo(map);
      routingControlRef.current = routingControl;
      routingControl.hide();
    } else {
      mapRef.current.setView(coordinates, 13);
      routingControlRef.current.setWaypoints([
        L.latLng(origin ? [origin.lat, origin.lng] : [0, 0]),
        L.latLng(coordinates),
      ]);
    }

    return () => {
      // No es necesario eliminar el mapa ni la capa de enrutamiento aquí
      // ya que serán reutilizados en el siguiente render
    };
  }, [coordinates, origin]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapaInfo;

