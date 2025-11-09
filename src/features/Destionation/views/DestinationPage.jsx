import useDestinationStore from "../state/destionationStore";
import FilledButton from "../../../shared/buttons/FilledButton";
import { Assets } from "../../../res/assets";
import { useState } from "react";
import MapViews from "../components/MapViews";
import useGeolocation from "../hook/useGeolocation";
import { useNavigate } from "react-router-dom";
import colors from "../../../res/colors";
import BlurBackground from "../../../shared/components/BlurBackground";
import TagComponent from "../../../shared/components/TagComponent";
import { useBookingStore } from "../../Booking/state/useBookingStore";

const DestinationPage = () => {
  const navigate = useNavigate();
  const { searchResults } = useDestinationStore();
  const setSelectedLocation = useBookingStore(
    (state) => state.setSelectedLocation
  );
  const setSelectedDestination = useBookingStore(
    (state) => state.setSelectedDestination
  );
  const [isBookmark, setIsBookmark] = useState({});
  const { userLocation, loading } = useGeolocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BlurBackground
          background="bg-black/5"
          blur="backdrop-blur-[40px]"
          className="absolute z-9999 w-full h-screen flex justify-center items-center"
        >
          <p style={{ color: colors.secondary }} className=" text-[1.2rem]">
            Mencari Lokasi...
          </p>
        </BlurBackground>
        <div className="w-full h-screen">
          <img src="images/image1.jpg" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  const toggleBookmark = (i) => {
    setIsBookmark({ ...isBookmark, [i]: !isBookmark[i] });
  };

  const visitLocation = (item) => {
    setSelectedLocation(1, {
      id: item.id,
      name: item.label,
      imgs: item.imgs,
      bg: item.bg,
      price: item.price,
      guest: item.guest,
      facility: item.facility,
    });

    setSelectedDestination(1, {
      from: { id: null, name: "Pilih Wisata Asal" },
      to: { id: null, name: "Pilih Wisata Tujuan" },
    });

    navigate("/booking-page");
  };

  return (
    <div>
      <MapViews userLocation={userLocation} />
      <div className="mt-20 grid grid-cols-4 [@media(max-width:1288px)]:grid-cols-3 [@media(max-width:950px)]:grid-cols-1 gap-5 mx-5 mb-5">
        {searchResults.length > 0 ? (
          searchResults.map((item, i) => (
            <div
              key={i}
              className="flex flex-col p-5 border border-black/8 rounded-2xl gap-2"
            >
              <div className="w-full h-70 overflow-hidden rounded-2xl relative">
                <img
                  src={item.bg}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute top-5 right-5">
                  <BlurBackground
                    onClick={() => toggleBookmark(i)}
                    blur="backdrop-blur-[5px]"
                    background="bg-white/30"
                    className="rounded-full w-fit p-2 shadow cursor-pointer"
                  >
                    <img
                      src={
                        isBookmark[i] ? Assets.HeartFilled : Assets.HeartOutline
                      }
                      className={`w-5 h-5 ${
                        !isBookmark[i] ? "gray-filter" : "red-filter jitter"
                      }`}
                    />
                  </BlurBackground>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <h1
                  style={{ color: colors.hytam }}
                  className="font-bold text-[1.2rem]"
                >
                  {item.label}
                </h1>
                <div className="flex items-center gap-2">
                  <img src={Assets.StarIcon} className="w-5 h-5" />
                  <p className="gray-filter">{item.rating}</p>
                </div>
              </div>
              <TagComponent tagName={item.owner} />
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={Assets.LocationIcon}
                  className="w-4.5 h-4.5 gray-filter"
                />
                <p className="gray-filter">{item.location}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <img className="w-5 h-5 gray-filter" src={Assets.GroupIcon} />
                <p className="gray-filter">{item.guest}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <h1
                  style={{ color: colors.orange }}
                  className="font-bold text-[1.3rem]"
                >
                  <span className="text-[1.5rem]">Rp </span>
                  {item.price}
                </h1>
                <FilledButton
                  text="Visit"
                  onClick={() => visitLocation(item)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
