import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";

const FitToBounds = ({ origin, destination }) => {
  const map = useMap();
  useEffect(() => {
    if (origin && destination) {
      map.fitBounds(
        [
          [origin.lat, origin.lng],
          [destination.lat, destination.lng],
        ],
        { padding: [50, 50] }
      );
    } else if (origin) {
      map.setView([origin.lat, origin.lng], 15);
    }
  }, [origin, destination, map]);
  return null;
};

const PickMap = ({ selectedAccommodation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setOrigin(coords);
      },
      (err) => {
        console.error(err);
        alert("Gagal mendapatkan lokasi user");
      }
    );
  }, []);

  useEffect(() => {
    if (selectedAccommodation?.latitude && selectedAccommodation?.longitude) {
      setDestination({
        lat: Number(selectedAccommodation.latitude),
        lng: Number(selectedAccommodation.longitude),
      });
    }
  }, [selectedAccommodation]);

  if (!userLocation) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-200">
        Loading map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Current Location */}
      {origin && (
        <Marker position={[origin.lat, origin.lng]}>
          <Popup>Current Location</Popup>
        </Marker>
      )}

      {/* Selected Accommodation */}
      {destination && (
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Selected Accommodation</Popup>
        </Marker>
      )}

      {/* Polyline */}
      {origin && destination && (
        <Polyline
          positions={[
            [origin.lat, origin.lng],
            [destination.lat, destination.lng],
          ]}
          pathOptions={{ color: "blue", weight: 4, opacity: 0.7 }}
        />
      )}

      <FitToBounds origin={origin} destination={destination} />
    </MapContainer>
  );
};

export default PickMap;
