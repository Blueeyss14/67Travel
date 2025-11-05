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

const DestinationPage = () => {
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, searchResults, setSelectedDestination } =
    useDestinationStore();
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

  const visitLocation = (item) => {
    setSelectedDestination(item.label);
    navigate("/booking-page");
  };

  return (
    <div className="">
      <MapViews userLocation={userLocation} />
      {/* <h1 className="text-2xl font-bold mb-4">Destination Page</h1>
        <p>Check In: {checkInDate ? checkInDate.toDateString() : "Belum ada"}</p>
        <p>
          Check Out: {checkOutDate ? checkOutDate.toDateString() : "Belum ada"}
        </p> */}

      <div className="mt-20 grid grid-cols-4 gap-5 bg mx-5 mb-5">
        {searchResults.length > 0 ? (
          searchResults.map((item, i) => (
            <div
              key={i}
              className="flex flex-col p-5 border border-black/8 rounded-2xl gap-2"
            >
              <div className="w-full h-70 overflow-hidden rounded-2xl">
                <div className="h-full w-full relative">
                  <div className="absolute h-full w-full">
                    <img
                      key={i}
                      src={item.bg}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <div className="absolute h-full w-full flex justify-end items-start p-5 bg-black/10">
                    <BlurBackground
                    blur="backdrop-blur-[5px]"
                    background="bg-white/30"
                    className="rounded-full w-fit p-2 shadow-[1px_1px_5px_rgba(0,0,0,0.1)] border border-white/20"
                    >
                      <img
                        key={i}
                        onClick={() => toggleBookmark(i)}
                        src={
                          isBookmark[i]
                            ? Assets.HeartFilled
                            : Assets.HeartOutline
                        }
                        className={`w-5 h-5 cursor-pointer ${
                          !isBookmark[i] ? "gray-filter" : "red-filter"
                        }`}
                      />
                    </BlurBackground>
                    {/* <div className="bg-white rounded-full w-fit p-2 shadow-[1px_1px_5px_rgba(0,0,0,0.1)]"></div> */}
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-between mt-3 ">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h1
                      style={{ color: colors.hytam }}
                      className="font-bold text-[1.2rem]"
                    >
                      {item.label}
                    </h1>

                    <div className="flex justify-center items-center p-2 rounded-full shadow-2xl w-fit gap-2">
                      <img src={Assets.StarIcon} className="w-5 h-5" />

                      <p className="gray-filter">{item.rating}</p>
                    </div>
                  </div>
                  <TagComponent tagName={item.owner}/>
                </div>

                {/* <img
                  onClick={() => toggleBookmark(i)}
                  src={isBookmark[i] ? Assets.HeartFilled : Assets.HeartOutline}
                  className="w-5 h-5 cursor-pointer"
                /> */}
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={Assets.LocationIcon}
                  className="w-4.5 h-4.5 gray-filter"
                />
                <p className="gray-filter">{item.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <img className="w-5 h-5 gray-filter" src={Assets.GroupIcon} />
                <p className="gray-filter">{item.guest}</p>
              </div>

              <div className="flex justify-between items-center">
                <h1
                  style={{ color: colors.orange }}
                  className="font-bold text-[1.3rem]"
                >
                  <span className="text-[1.5rem]">Rp </span>
                  {item.price}
                </h1>
                <FilledButton
                  key={i}
                  text="Visit"
                  onClick={() => visitLocation(item)}
                />
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
