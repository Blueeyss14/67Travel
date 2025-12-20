import { useNavigate, useLocation } from "react-router-dom";
import { Assets } from "../../../res/assets";
import MapViews from "../components/MapViews";
import useGeolocation from "../hook/useGeolocation";
import colors from "../../../res/colors";
import BlurBackground from "../../../shared/components/BlurBackground";
import TagComponent from "../../../shared/components/TagComponent";
import PrimaryButton from "../../../shared/buttons/PrimaryButton";
import useDestinations from "../hook/useDestination";
import { useState, useEffect } from "react";


const DestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLocation } = useGeolocation();
  const [searchValue, setSearchValue] = useState("");
  const { destinations, loading, isBookmark, toggleBookmark } = useDestinations(searchValue);

  useEffect(() => {
    const initialSearch = location.state?.searchValue || "";
    setSearchValue(initialSearch);
  }, [location.state]);

  const visitLocation = (item) => {
    navigate("/booking-page", {
      state: { selectedLocation: item },
    });
  };


  const handleSearch = (value) => {
    setSearchValue(value);
  };


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


  return (
    <div className="bg-slate-50">
      <MapViews userLocation={userLocation} onSearch={handleSearch} />
      <div className="mt-20 grid grid-cols-4 [@media(max-width:1288px)]:grid-cols-3 [@media(max-width:950px)]:grid-cols-1 gap-5 mx-5 mb-5 ">
        {destinations.length > 0 ? (
          destinations.map((item, i) => (
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
                    onClick={() => toggleBookmark(i, item.id)}
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <img
                    src={Assets.LocationIcon}
                    className="w-4 h-4 gray-filter"
                    alt="Location"
                  />
                </div>
                <span className="gray-filter text-sm">{item.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <img
                    src={Assets.GroupIcon}
                    className="w-4 h-4 gray-filter"
                    alt="Guests"
                  />
                </div>
                <span className="gray-filter text-sm">{item.guest}</span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">Mulai dari</span>
                    <h3
                      style={{ color: colors.orange }}
                      className="font-bold text-xl"
                    >
                      Rp {item.price}
                      <span className="text-gray-500 text-sm font-normal">
                        {" "}
                        /hari
                      </span>
                    </h3>
                  </div>
                  <PrimaryButton
                    text="Visit"
                    className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md active:scale-95"
                    onClick={() => visitLocation(item)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada destinasi</p>
        )}
      </div>
    </div>
  );
};



export default DestinationPage;
