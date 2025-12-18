import PickMap from "../components/PickMap";
import colors from "../../../res/colors";
import { Assets } from "../../../res/assets";
import { useState } from "react";
import Chat from "../components/Chat";
import TagComponent from "../../../shared/components/TagComponent";
import BlurBackground from "../../../shared/components/BlurBackground";
import DetailBooking from "../../Booking/views/DetailBooking";
import BottomBar from "../components/BottomBar";
import FeedbackPage from "../../home/view/FeedbackPage";
import { useLocation } from "react-router-dom";
import Rating from "../components/Rating";
import useDestinations from "../../Destionation/hook/useDestination";

const BookingPage = () => {
  const location = useLocation();
  const selectedLocation = location.state?.selectedLocation;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedVehicle, setSelectedVehicle] = useState({ id: null, name: "Pilih Kendaraan" });
  const [selectedAccommodation, setSelectedAccommodation] = useState({ id: null, name: "Pilih Akomodasi" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [visitorCount, setVisitorCount] = useState(1);

  const { destinations, isBookmark, toggleBookmark } = useDestinations();

  const index = destinations.findIndex(
    (d) => d.id === selectedLocation?.id
  );

  const bookmarked = index !== -1 ? isBookmark[index] : false;

  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!selectedLocation?.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Belum ada destinasi yang dipilih</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen scroll-gray">
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
        <div className="w-full h-full flex overflow-hidden">
          <div className="flex-1 h-full p-5 box-border flex flex-col overflow-y-auto">
            <div className="bg-gray-100 w-full h-[50%] shrink-0 overflow-hidden rounded-2xl border border-black/10">
              <PickMap selectedAccommodation={selectedLocation} />
            </div>

            <div className="flex justify-between items-center mt-5 shrink-0">
              <h1
                style={{ color: colors.hytam }}
                className="font-bold text-2xl"
              >
                {selectedLocation.label}
              </h1>
              <img
                onClick={() =>
                  index !== -1 &&
                  toggleBookmark(index, selectedLocation.id)
                }
                src={
                  bookmarked
                    ? Assets.BookmarkFilledIcon
                    : Assets.BookmarkOutlinedIcon
                }
                className="h-6 w-6 cursor-pointer"
              />
            </div>

            <div className="flex gap-2 my-3">
              {selectedLocation.facility.map((item, i) => (
                <TagComponent key={i} tagName={item} />
              ))}
            </div>

            <div className="flex flex-col w-full gap-1 mb-5">
              <div className="flex items-center gap-2">
                <img src={Assets.StarIcon} className="w-5 h-5" />
                <p className="gray-filter">{selectedLocation.rating}</p>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <img
                  src={Assets.LocationIcon}
                  className="w-4.5 h-4.5 gray-filter"
                />
                <p className="gray-filter">{selectedLocation.location}</p>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <img
                  src={Assets.PriceIcon}
                  className="w-4.5 h-4.5 gray-filter"
                />
                <p className="gray-filter">Rp. {selectedLocation.price}</p>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <h1 className="py-3 text-black/80">
                {selectedLocation.description}
              </h1>

              {Array.isArray(selectedLocation.imgs) &&
              selectedLocation.imgs.length > 0 ? (
                <div className="w-full h-[200px] shrink-0 mt-3 flex items-center overflow-x-auto gap-2.5 cursor-pointer scroll-gray">
                  {selectedLocation.imgs.map((item, i) => (
                    <div
                      key={i}
                      className="h-full w-85 bg-gray-300 shrink-0 rounded-2xl overflow-hidden"
                    >
                      <img src={item} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}

              <FeedbackPage ratings={selectedLocation.ratings} />
              <Rating destinationId={selectedLocation.id} />
            </div>

            <div className="pb-20">
              <DetailBooking
                width="w-full"
                mediaQuery="[@media(min-width:1025px)]:hidden"
                setDropdownOpen={setDropdownOpen}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                selectedAccommodation={selectedAccommodation}
                setSelectedAccommodation={setSelectedAccommodation}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                visitorCount={visitorCount}
                setVisitorCount={setVisitorCount}
              />
            </div>
          </div>

          <DetailBooking
            mediaQuery="[@media(max-width:1025px)]:hidden "
            setDropdownOpen={setDropdownOpen}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            selectedAccommodation={selectedAccommodation}
            setSelectedAccommodation={setSelectedAccommodation}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            visitorCount={visitorCount}
            setVisitorCount={setVisitorCount}
          />
        </div>
      </div>

      <BottomBar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        destinationId={selectedLocation?.id}
        vehicleId={selectedVehicle?.uuid}
        accommodationId={selectedAccommodation?.uuid}
        expiredAt={selectedDate}
        guestCount={visitorCount}
      />
    </div>
  );
};

export default BookingPage;