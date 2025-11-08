import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import colors from "../../../res/colors";
import useDestinationStore from "../state/destionationStore";
import FilledButton from "../../../shared/buttons/FilledButton";

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const MapViews = ({ userLocation }) => {
  const { searchDestinations } =
    useDestinationStore();

  const handleSearch = () => {
    searchDestinations();
  };
  return (
    <div className="w-full h-80 relative">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        className="absolute inset-0"
        dragging={false}
        touchZoom={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Lokasi Kamu</Popup>
        </Marker>
        <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />
      </MapContainer>

      <div className="absolute top-55 left-1/2 -translate-x-1/2 w-11/12 h-50 z-9999 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg w-full p-3 flex items-center">
          <SearchLocation />
          <FilledButton onClick={handleSearch} text="Search" />
        </div>
      </div>
    </div>
  );
};

export default MapViews;

const SearchLocation = () => {
  const [value, setValue] = useState("");
  const { setSearchQuery } = useDestinationStore();

  const handleChange = (e) => {
    setValue(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      style={{ backgroundColor: colors.secondary }}
      type="text"
      placeholder="Search Your Fav Location"
      className={`box-border px-5 h-full w-full outline-none ml-3 rounded-[10px] [@media(max-width:950px)]:text-[0.9rem]`}
    />
  );
};
