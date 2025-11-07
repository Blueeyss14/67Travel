import Dropdown from "../../../shared/dropdown/Dropdown";
import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import { useBookingStore } from "../state/useBookingStore";
import { carouselImageData } from "../../home/data/carouselImageData";

const ChooseLocation = ({ setDropdownOpen }) => {
  const { currentDay, days, setSelectedLocation } = useBookingStore();
  const isDay1 = currentDay === 1;

  const selectedLocation = days[currentDay]?.selectedLocation || {
    id: null,
    name: "Pilih Lokasi",
  };

  return (
    <div className="w-full mb-5">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1rem] mb-3"
      >
        Pilih Lokasi
      </h1>

      <Dropdown
        onOpen={() => setDropdownOpen(true)}
        onClose={() => setDropdownOpen(false)}
        className="w-full"
        trigger={
          <button
            style={{ color: isDay1 ? "gray" : colors.hytam }}
            className={`bg-white px-4 py-2 rounded-2xl w-full border border-black/20 cursor-pointer ${
              isDay1 ? "" : "hover:bg-gray-50"
            }`}
            disabled={isDay1}
          >
            <div className="flex justify-between items-center">
              <p>{selectedLocation.name}</p>
              <img
                src={Assets.LeftArrowIcon}
                className={`w-3 h-3 -rotate-90 gray-filter`}
              />
            </div>
          </button>
        }
      >
        {!isDay1 && (
          <div style={{ color: colors.hytam }} className="bg-gray-100">
            {carouselImageData.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedLocation(currentDay, {
                    id: item.id,
                    name: item.label,
                  })
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
                    <p
                      style={{ color: colors.hytam }}
                      className="font-semibold"
                    >
                      {item.label}
                    </p>
                    <div className="w-full justify-between flex items-center">
                      <p
                        c
                        style={{ color: colors.primary }}
                        lassName="text-[0.9rem]"
                      >
                        Rp.{item.price}
                      </p>
                      <p
                        style={{ color: colors.hytam }}
                        className="text-[0.9rem]"
                      >
                        Max: {item.guest}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Dropdown>
    </div>
  );
};

export default ChooseLocation;
