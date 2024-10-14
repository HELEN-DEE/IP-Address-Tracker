import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

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

// Custom hook to detect window width
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const Map = ({ coordinates }) => {
  const [mapKey, setMapKey] = useState(0);
  const size = useWindowSize(); // Get the window size

  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [coordinates]);

  const position = coordinates && coordinates.lat && coordinates.lng
    ? [coordinates.lat, coordinates.lng]
    : [51.505, -0.09];

  // Hide zoom control on mobile (width < 768px)
  const isMobile = size.width < 768;

  return (
    <div className="w-full h-[75vh] md:h-[70vh] lg:h-[61vh] z-0 absolute overflow-hidden">
      <MapContainer
        key={mapKey}
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={!isMobile} // Disable zoom control on mobile
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
        <ChangeMapView coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
