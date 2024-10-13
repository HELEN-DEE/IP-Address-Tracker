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
      })
      .catch((error) => {
        console.error("Error fetching IP data:", error);
      });
  };

  useEffect(() => {
    fetchLocation(''); // Fetch data for user's IP on initial load
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header fetchLocation={fetchLocation}/>
      <main className="flex-grow">
        <Stats ipAddress={ipAddress} location={location} timezone={timezone} isp={ISP} />
        <Map coordinates={coordinates} />
      </main>
    </div>
  );
};



export default IPaddress;