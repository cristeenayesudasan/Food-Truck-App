import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Button } from "@mui/material";

const containerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 8.5241, lng: 76.9366 }; // Default: Trivandrum

const LocationUpdate = () => {
  const [location, setLocation] = useState(defaultCenter);

  // Handle map click to update marker position
  const handleMapClick = useCallback((event) => {
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  // Save location to backend
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/location/update", location);
      alert("Food Truck Location Updated!");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCaA_Ldw-VyRb3ePRJIbVImw0JC63LQ6x4">
      <div style={{ textAlign: "center", padding: "16px" }}>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>Set Food Truck Location</h2>
        <p style={{ color: "gray", marginBottom: "16px" }}>Click on the map to choose the truck’s location.</p>
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12} onClick={handleMapClick}>
          <Marker position={location} />
        </GoogleMap>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary" 
          style={{ marginTop: "16px" }}
        >
          Save Location
        </Button>
      </div>
    </LoadScript>
  );
};

export default LocationUpdate;
