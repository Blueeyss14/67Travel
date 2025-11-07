import PickMap from "../components/PickMap";
import useGeolocation from "../../Destionation/hook/useGeolocation";
import useMapStore from "../state/useMapStore";
import colors from "../../../res/colors";
import { Assets } from "../../../res/assets";
import { useState } from "react";
import Chat from "../components/Chat";
import TagComponent from "../../../shared/components/TagComponent";
import BlurBackground from "../../../shared/components/BlurBackground";
import DetailBooking from "../../Booking/views/DetailBooking";
import BottomBar from "../components/BottomBar";
import { useBookingStore } from "../../Booking/state/useBookingStore";
import { carouselImageData } from "../../home/data/carouselImageData";

const BookingPage = () => {
  const { currentDay, days } = useBookingStore();
  const { originText, destinationText } = useMapStore();
  const { userLocation } = useGeolocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectedLocation = days[currentDay]?.selectedLocation;
  const locationData = carouselImageData.find(
    (item) => item.id === selectedLocation?.id
  );

  if (!selectedLocation?.id || !locationData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Belum ada destinasi yang dipilih</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="absolute w-full h-full z-99999 overflow-hidden pointer-events-none">
        <Chat isOpen={isOpen} openChat={openChat} />
      </div>
      {(isOpen || dropdownOpen) && (
        <BlurBackground
          onClick={() => {
            setIsOpen(false);
            setDropdownOpen(false);
          }}
          blur="backdrop-blur-[10px]"
          background="bg-black/5"
          className="absolute w-full h-full z-9999 overflow-hidden"
        />
      )}

      <div className="flex-1 box-border p-0 overflow-hidden flex">
        <div className="w-full h-full flex">
          <div className="flex-1 h-full p-5 box-border overflow-hidden flex flex-col">
            <div className="bg-gray-100 w-full h-[60%] overflow-hidden rounded-2xl border border-black/10">
              <PickMap userLocation={userLocation} />
            </div>

            <div className="flex justify-between items-center mt-5">
              <h1 style={{ color: colors.hytam }} className="font-bold text-2xl">
                {selectedLocation.name}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="border border-black/10 rounded-2xl w-40 h-12 px-3 flex justify-center items-center">
                  <p style={{ color: colors.hytam }} className="line-clamp-1">
                    {originText}
                  </p>
                </div>
                <div className="border border-black/10 h-12 w-12 rounded-2xl flex justify-center items-center">
                  <img src={Assets.PlaneIcon} className="w-8 h-8 gray-filter" />
                </div>
                <div className="border border-black/10 rounded-2xl w-40 h-12 px-3 flex justify-center items-center">
                  <p style={{ color: colors.hytam }} className="line-clamp-1">
                    {destinationText}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 my-3">
              {locationData.facility.map((item, i) => (
                <TagComponent key={i} tagName={item} />
              ))}
            </div>

            <div className="w-full flex-1 mt-3 flex items-center overflow-x-auto gap-2.5 cursor-pointer scroll-gray">
              {locationData.imgs.map((item, i) => (
                <div
                  key={i}
                  className="h-full w-85 bg-gray-300 shrink-0 rounded-2xl overflow-hidden"
                >
                  <img src={item} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <DetailBooking setDropdownOpen={setDropdownOpen} />
        </div>
      </div>

      <BottomBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BookingPage;
