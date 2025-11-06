import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import useMapStore from "../state/useMapStore";
import { useBookingStore } from "../../Booking/state/useBookingStore";
import { locationData } from "../../Booking/data/locationData";
import { useEffect } from "react";

const FitToBounds = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      const bounds = [
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      ];
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (origin) {
      map.setView([origin.lat, origin.lng], 15);
    }
  }, [origin, destination, map]);

  return null;
};

const PickMap = ({ userLocation }) => {
  const { origin, destination, setOrigin, setDestination } = useMapStore();
  const { currentDay, days } = useBookingStore();
  const selectedDestination = days[currentDay]?.selectedDestination;

  useEffect(() => {
    const fromLoc = locationData.find((loc) => loc.id === selectedDestination.from.id);
    const toLoc = locationData.find((loc) => loc.id === selectedDestination.to.id);

    if (fromLoc) setOrigin({ lat: fromLoc.lat, lng: fromLoc.long });
    if (toLoc) setDestination({ lat: toLoc.lat, lng: toLoc.long });
  }, [selectedDestination, setOrigin, setDestination]);

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
      // dragging={false}
      // doubleClickZoom={false}
      // touchZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {origin && (
        <Marker position={[origin.lat, origin.lng]}>
          <Popup>Awal</Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Tujuan</Popup>
        </Marker>
      )}

      {origin && destination && (
        <Polyline
          positions={[
            [origin.lat, origin.lng],
            [destination.lat, destination.lng],
          ]}
          pathOptions={{ color: "blue" }}
        />
      )}

      <FitToBounds origin={origin} destination={destination} />
    </MapContainer>
  );
};

export default PickMap;
