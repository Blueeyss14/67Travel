import Dropdown from "../../../shared/dropdown/Dropdown";import { Assets } from "../../../res/assets";
import { carouselImageData } from "../../home/data/carouselImageData";
import colors from "../../../res/colors";
import { useBookingStore } from "../state/useBookingStore";

const ChooseLocation = ({ setDropdownOpen }) => {
  const { currentDay, days, setSelectedLocation } = useBookingStore();

  const selectedLocation = days[currentDay]?.selectedLocation || {
    id: null,
    name: "Pilih Lokasi",
  };

  return (
    <div className="w-full">
      <h1 style={{ color: colors.hytam }} className="font-bold text-[1.2rem] mb-3">
        Pilih Lokasi
      </h1>

      <Dropdown
        onOpen={() => setDropdownOpen(true)}
        onClose={() => setDropdownOpen(false)}
        className="w-full"
        trigger={
          <button className="bg-white px-4 py-2 rounded-2xl w-full border border-black/40">
            <div className="flex justify-between items-center">
              <p>{selectedLocation.name}</p>
              <img src={Assets.LeftArrowIcon} className="w-4 h-4 -rotate-90" />
            </div>
          </button>
        }
      >
        <div style={{ color: colors.hytam }} className="bg-gray-100">
          {carouselImageData.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setSelectedLocation(currentDay, { id: item.id, name: item.label })
              }
              className={`p-5 hover:bg-gray-200 cursor-pointer flex flex-col w-full ${
                selectedLocation.id === item.id ? "bg-gray-200" : "bg-gray-50"
              } shadow`}
            >
              <div className="flex items-center gap-3">
                <div className="w-15 h-15 bg-amber-200 overflow-hidden rounded-lg">
                  <img src={item.bg} className="w-full h-full object-cover" />
                </div>
                <div className="w-full">
                  <p className="font-semibold">{item.label}</p>
                  <div className="w-full justify-between flex items-center">
                    <p className="text-[0.9rem]">Rp.{item.price}</p>
                    <p className="text-[0.9rem]">Max: {item.guest}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default ChooseLocation;
