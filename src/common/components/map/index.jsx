import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null);
  const latitude = 44.342;
  const longitude = 25.9597;

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      ref={mapRef}
      style={{
        height: "600px",
        width: "95%",
        margin: "10px",
        border: "5px solid #c9c9c9",
        boxShadow: "0 0 20px #c9c9c9",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>VAULT BANK CENTER</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
