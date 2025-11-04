import useDestinationStore from "../state/destionationStore";
import Card from "../../../shared/components/Card";
import FilledButton from "../../../shared/buttons/FilledButton";
import { Assets } from "../../../res/assets";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapViews from "../components/MapViews";
import useGeolocation from "../hook/useGeolocation";

const DestinationPage = () => {
  const { checkInDate, checkOutDate, searchResults } = useDestinationStore();
  const [isBookmark, setIsBookmark] = useState({});
  const { userLocation, loading } = useGeolocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Mendeteksi lokasi...</p>
      </div>
    );
  }

  const toggleBookmark = (i) => {
    setIsBookmark({ ...isBookmark, [i]: !isBookmark[i] });
  };

  return (
    <div className="">
      <MapViews userLocation={userLocation} />
      {/* <h1 className="text-2xl font-bold mb-4">Destination Page</h1>
        <p>Check In: {checkInDate ? checkInDate.toDateString() : "Belum ada"}</p>
        <p>
          Check Out: {checkOutDate ? checkOutDate.toDateString() : "Belum ada"}
        </p> */}

      <div className="mt-20 grid grid-cols-3 gap-5 bg mx-5 mb-5">
        {searchResults.length > 0 ? (
          searchResults.map((item, i) => (
            <div className="flex flex-col p-5 shadow-[1px_1px_1px_rgba(0,0,0,0.1)] rounded-2xl">
              <div className="w-full h-70 overflow-hidden rounded-2xl">
                <img
                  key={i}
                  src={item.bg}
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="w-full flex items-center justify-between mt-3 ">
                <h1 className="font-bold text-[1.2rem]">{item.label}</h1>
                <img
                  onClick={() => toggleBookmark(i)}
                  src={isBookmark[i] ? Assets.HeartFilled : Assets.HeartOutline}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <p>{item.location}</p>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <p>{item.guest}</p>
                  <img className="w-5 h-5 gray-filter" src={Assets.GroupIcon} />
                </div>

                <FilledButton text="Visit" />
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil ditemukan.</p>
        )}
        {/* {searchResults.length > 0 ? (
            searchResults.map((item, i) => (
              <Card key={i} 
              subTitle={item.owner}
              imageUrl={item.bg}
              title={item.label} description={item.description}
              />
            ))
          ) : (
            <p>Tidak ada hasil ditemukan.</p>
          )} */}

        {/* {searchResults.length > 0 ? (
            searchResults.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-xl border border-white/20 "
              >
                <img
                  src={item.bg}
                  alt={item.label}
                  className="rounded-lg mb-3 w-full h-40 object-cover"
                />
                <h2 className="font-bold">{item.label}</h2>
                <p className="text-sm opacity-80">{item.owner}</p>
                <p className="text-sm mt-1">{item.location}</p>
                <p className="text-xs mt-2">{item.description}</p>
              </div>
            ))
          ) : (
            <p>Tidak ada hasil ditemukan.</p>
          )} */}
      </div>
    </div>
  );
};

export default DestinationPage;
