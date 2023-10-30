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

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const MapaInfo = ({ coordinates }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    // Verifica si ya existe un mapa en el ref actual
    if (!mapRef.current) {
      const map = L.map('map', {
        center: coordinates,
        zoom: 13,
        dragging: true, // Habilita el arrastre del mapa
        zoomControl: true, // Habilita el control de zoom
        doubleClickZoom: 'center',
        boxZoom: false,
        touchZoom: true, // Habilita el zoom táctil
        scrollWheelZoom: true, // Habilita el zoom con la rueda del ratón
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

      const initialCoordinates = [6.27502919502266, -75.59265372007177];

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(initialCoordinates),
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
          styles: [{clickable: false, draggable: false }],
        },
      });

      routingControl.addTo(map);
      routingControlRef.current = routingControl;

      // Oculta la capa de enrutamiento (se vuelve no editable)
      routingControl.hide();
    } else {
      // Si el mapa ya existe, simplemente actualiza la ubicación
      mapRef.current.setView(coordinates, 13);

      // Actualiza las coordenadas de los waypoints en la capa de enrutamiento
      routingControlRef.current.setWaypoints([
        L.latLng([6.27502919502266, -75.59265372007177]),
        L.latLng(coordinates),
      ]);
    }

    return () => {
      // No es necesario eliminar el mapa ni la capa de enrutamiento aquí
      // ya que serán reutilizados en el siguiente render
    };
  }, [coordinates]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapaInfo;

