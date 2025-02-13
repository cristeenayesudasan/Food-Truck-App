import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 9.9312,  // Default latitude (Example: Kerala, India)
  lng: 76.2673, // Default longitude
};

const UpdateLocation = () => {
  const [location, setLocation] = useState(center);

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/location/update", location);
      alert("Food Truck Location Updated!");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <div>
      <h2>Update Food Truck Location</h2>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={12}
          onClick={handleMapClick}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
      <button onClick={handleSubmit}>Save Location</button>
    </div>
  );
};

export default UpdateLocation;
