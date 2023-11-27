import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

/**
 * Componente que representa un mapa con información de rutas y leyenda.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.coordinates - Coordenadas del destino en el formato { lat: number, lng: number }.
 * @returns {JSX.Element} Retorna un elemento JSX que representa el mapa.
 */
const MapaInfo = ({ coordinates }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializa el mapa
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

      // Añade la capa de azulejos de OpenStreetMap al mapa
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Define íconos para los marcadores azul y rojo
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

      // Obtiene la ubicación actual del usuario si está disponible
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

      // Configura la capa de enrutamiento
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

      // Añade la capa de enrutamiento al mapa
      routingControl.addTo(map);
      routingControlRef.current = routingControl;
      routingControl.hide();
      
      // Añade la leyenda con estilos
      const legend = L.control({ position: 'bottomright' });

      legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML =
          '<div style="background-color: white; padding: 5px; border-radius: 5px;">' +
          '<p style="font-weight: bold;">Leyenda</p>' +
          '<p style="margin: 0;"><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" alt="Blue Marker" style="height: 15px; width: 15px; margin-right: 5px;"> Azul: Actual</p>' +
          '<p style="margin: 0;"><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" alt="Red Marker" style="height: 15px; width: 15px; margin-right: 5px;"> Rojo: Destino</p>' +
          '</div>';
        return div;
      };

      legend.addTo(map);
    } else {
      // Establece la vista del mapa y los puntos de enrutamiento
      mapRef.current.setView(origin, 13);
      routingControlRef.current.setWaypoints([
        L.latLng(origin ? [origin.lat, origin.lng] : [0, 0]),
        L.latLng(coordinates),
      ]);
    }

    // Limpia el efecto en la fase de desmontaje del componente
    return () => {
      // No es necesario eliminar el mapa ni la capa de enrutamiento aquí
      // ya que serán reutilizados en el siguiente render
    };
  }, [coordinates, origin]);

  // Renderiza el componente con un contenedor div para el mapa
  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapaInfo;
