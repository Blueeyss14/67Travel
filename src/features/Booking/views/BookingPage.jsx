import useDestinationStore from "../../Destionation/state/destionationStore";
import PickMap from "../components/PickMap";
import useGeolocation from "../../Destionation/hook/useGeolocation";
import useMapStore from "../state/useMapStore";
import colors from "../../../res/colors";
import { Assets } from "../../../res/assets";
import FilledButton from "../../../shared/buttons/FilledButton";
import { useState } from "react";
import Chat from "../components/Chat";
import TagComponent from "../../../shared/components/TagComponent";
import BlurBackground from "../../../shared/components/BlurBackground";
import { carData } from "../data/carData";
import Dropdown from "../../../shared/dropdown/Dropdown";

const BookingPage = () => {
  const { selectedDestination, searchResults } = useDestinationStore();
  const { originText, destinationText } = useMapStore();
  const { userLocation } = useGeolocation();

  const destination = searchResults.find(
    (item) => item.label === selectedDestination
  );

  const [isOpen, setIsOpen] = useState(false);
  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!destination) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Belum ada destinasi yang dipilih</p>
      </div>
    );
  }

  return (
    // <div className="p-10 text-3xl font-bold">
    //   {selectedDestination || "Belum memilih destinasi"}
    // </div>
    <div className="flex flex-col w-full h-screen">
      <div className="absolute w-full h-full z-99999 overflow-hidden pointer-events-none">
        <Chat isOpen={isOpen} openChat={openChat} />
      </div>
      {isOpen && (
        <BlurBackground
          onClick={() => setIsOpen(false)}
          blur="backdrop-blur-[10px]"
          background="bg-black/5"
          className="absolute w-full h-full z-9999 overflow-hidden"
        />
      )}

      <div className="flex-1 box-border p-0 overflow-hidden flex">
        {/* <div className="w-[65%] h-[30%]">
          <div className="bg-gray-100 w-full h-[55vh] overflow-hidden rounded-2xl">
            <PickMap userLocation={userLocation} />
          </div>
          <h1
            style={{ color: colors.hytam }}
            className="font-bold text-2xl mt-3"
          >
            {destination.label}
          </h1>
          <div className="flex gap-2 mt-3">
            {destination.facility.map((item) => (
              <TagComponent tagName={item} />
            ))}
          </div> */}
        <div className="w-full h-full flex">
          <div className="flex-1 h-full p-5 box-border overflow-hidden flex flex-col">
            <div className="bg-gray-100 w-full h-[60%] overflow-hidden rounded-2xl">
              <PickMap userLocation={userLocation} />
            </div>
            <div className="flex justify-between items-center mt-5">
              <h1
                style={{ color: colors.hytam }}
                className="font-bold text-2xl"
              >
                {destination.label}
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
              {destination.facility.map((item, i) => (
                <TagComponent key={i} tagName={item} />
              ))}
            </div>
            {/* BUAT FOTO */}
            <div className="w-full flex-1 mt-3 flex items-center overflow-x-auto gap-2.5 cursor-pointer">
              {destination.imgs.map((item, i) => (
                <div
                  key={i}
                  className="h-full w-100 bg-gray-300 shrink-0 rounded-2xl overflow-hidden"
                >
                  <img src={item} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* <div className="bg-green-200 flex-1 w-full h-full"></div> */}
          </div>
          {/* BUAT DETAIL */}
          <div className="w-[35%] h-full bg-red-100">
            <Dropdown
              trigger={
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Pilih Mobil
                </button>
              }
            >
              <div className="p-2">
                {carData.map((item) => (
                  <div className="p-2 hover:bg-white">
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </Dropdown>
            {/* <select defaultValue="" className="bg-white">
              <option value="" disabled>
                Pilih mobil
              </option>
              {carData.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select> */}
          </div>
        </div>
        {/* <p>Awal: {originText}</p>
          <p>Tujuan: {destinationText}</p> */}
        {/* </div> */}
      </div>
      <div className="bg-white w-full h-20 flex justify-end z-99999 items-center gap-5 shadow-[1px_1px_15px_rgba(0,0,0,0.1)] box-border px-10">
        <img
          src={Assets.CustomerChatIcon}
          className="w-10 h-10 cursor-pointer"
          onClick={openChat}
        />

        <FilledButton size="h-fit w-fit px-4 py-2" text="Check Out" />
      </div>
    </div>
  );
};

export default BookingPage;
