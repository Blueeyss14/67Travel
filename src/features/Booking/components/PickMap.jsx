import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import useMapStore from "../state/useMapStore";

const DestinationPicker = () => {
  const handleMapClick = useMapStore((s) => s.handleMapClick);

  useMapEvents({
    click(e) {
      handleMapClick(e.latlng);
    },
  });

  return null;
};

const PickMap = ({ userLocation }) => {
  const { origin, destination } = useMapStore();

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

      <DestinationPicker />
    </MapContainer>
  );
};

export default PickMap;
