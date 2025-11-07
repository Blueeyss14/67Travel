import Dropdown from "../../../shared/dropdown/Dropdown";
import { Assets } from "../../../res/assets";
import { useBookingStore } from "../state/useBookingStore";
import { locationData } from "../data/locationData";
import colors from "../../../res/colors";

const ChooseDestination = ({ setDropdownOpen }) => {
  const { currentDay, days, setSelectedDestination } = useBookingStore();
  const selectedDestination = days[currentDay]?.selectedDestination || {
    from: { id: null, name: "Pilih Wisata Asal" },
    to: { id: null, name: "Pilih Wisata Tujuan" },
  };

  const handleSelect = (type, loc) => {
    const otherType = type === "from" ? "to" : "from";
    if (selectedDestination[otherType]?.id === loc.id) return;

    setSelectedDestination(currentDay, {
      ...selectedDestination,
      [type]: { id: loc.id, name: loc.name },
    });
  };

  return (
    <div className="w-full cursor-pointer">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1rem] mb-3"
      >
        Pilih Destinasi
      </h1>
      <div className="w-full flex gap-2 justify-between items-center h-12 text-black/60 cursor-pointer">
        {/* From */}
        <Dropdown
          onOpen={() => setDropdownOpen(true)}
          onClose={() => setDropdownOpen(false)}
          className="w-full"
          trigger={
            <button className="bg-white px-4 py-3 rounded-2xl w-full border border-black/10 cursor-pointer line-clamp-1">
              {selectedDestination.from.name}
            </button>
          }
        >
          <div className="bg-gray-100 p-2 overflow-hidden overflow-y-auto max-h-50 scroll-gray">
            {locationData.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleSelect("from", loc)}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded-[5px] ${
                  selectedDestination.from.id === loc.id
                    ? "bg-gray-200"
                    : "bg-gray-50"
                } ${
                  selectedDestination.to.id === loc.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <div>
                  <h1 style={{ color: colors.hytam }}>{loc.name}</h1>
                  <p
                    style={{ color: colors.primary }}
                    className="text-[0.8rem]"
                  >
                    Rp.{loc.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Dropdown>

        <div className="border border-black/10 h-12 w-30 rounded-2xl flex justify-center items-center">
          <img src={Assets.PlaneIcon} className="w-8 h-8 gray-filter" />
        </div>

        {/* To */}
        <Dropdown
          onOpen={() => setDropdownOpen(true)}
          onClose={() => setDropdownOpen(false)}
          className="w-full"
          trigger={
            <button className="bg-white px-4 py-3 rounded-2xl w-full border border-black/10 cursor-pointer line-clamp-1">
              {selectedDestination.to.name}
            </button>
          }
        >
          <div className="bg-gray-100 p-2 overflow-hidden overflow-y-auto max-h-50 scroll-gray">
            {locationData.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleSelect("to", loc)}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded-[5px] ${
                  selectedDestination.to.id === loc.id
                    ? "bg-gray-200"
                    : "bg-gray-50"
                } ${
                  selectedDestination.from.id === loc.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <div>
                  <h1 style={{ color: colors.hytam }}>{loc.name}</h1>
                  <p
                    style={{ color: colors.primary }}
                    className="text-[0.8rem]"
                  >
                    Rp.{loc.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default ChooseDestination;
