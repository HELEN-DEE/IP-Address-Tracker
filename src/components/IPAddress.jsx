import { useState, useEffect } from 'react';
import Header from "./Header";
import Stats from "./Stats";
import Map from "./Map";

const IPaddress = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [ISP, setISP] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09});
  const [hasSearched, setHasSearched] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const fetchLocation = (ip) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_MzfBsSVpYaDjmgTM4NyClIzoPkhcP&ipAddress=${ip}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIpAddress(data.ip);
        setLocation(`${data.location.city}, ${data.location.country} ${data.location.postalCode}`);
        setTimezone(`UTC ${data.location.timezone}`);
        setISP(data.isp);
        setCoordinates({ lat: data.location.lat, lng: data.location.lng });
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("Error fetching IP data:", error);
      });
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      <Header fetchLocation={fetchLocation}/>
      <main className="flex-grow">
        {hasSearched && (
          <>
            <Stats ipAddress={ipAddress} location={location} timezone={timezone} isp={ISP} />
            <div className="flex justify-center mt-4 h-[100vh] md:h-[50vh] items-center">
              <button 
                onClick={handleShowMap}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Show Map
              </button>
            </div>
          </>
        )}
        {showMap && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseMap}
          >
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl h-[70vh] relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the map
            >
              <Map coordinates={coordinates} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default IPaddress;