import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function ChangeMapView({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lng]);
  }, [coordinates, map]);
  return null;
}

const Map = ({ coordinates }) => {
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [coordinates]);

  const position = coordinates && coordinates.lat && coordinates.lng
    ? [coordinates.lat, coordinates.lng]
    : [51.505, -0.09];

  return (
    <MapContainer
      key={mapKey}
      center={position}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A location at {position[0]}, {position[1]}
        </Popup>
      </Marker>
      <ZoomControl position="topleft" />
      <ChangeMapView coordinates={coordinates} />
    </MapContainer>
  );
};

export default Map;
