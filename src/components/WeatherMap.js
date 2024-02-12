import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function WeatherMap({ location }) {
  // Use location as part of the key to force re-render
  const mapKey = location ? `${location[0]}-${location[1]}` : "default-key";

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "250px", width: "100%", marginTop: "40px" }}
      key={mapKey}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={location} />
    </MapContainer>
  );
}

export default WeatherMap;
