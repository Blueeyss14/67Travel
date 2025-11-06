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
    <div className="w-full">
      <h1
        style={{ color: colors.hytam }}
        className="font-bold text-[1.2rem] mb-3"
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
            <button className="bg-white px-4 py-3 rounded-2xl w-full border border-black/10">
              {selectedDestination.from.name}
            </button>
          }
        >
          <div className="bg-gray-100 p-2">
            {locationData.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleSelect("from", loc)}
                className={`p-2 cursor-pointer ${
                  selectedDestination.from.id === loc.id
                    ? "bg-gray-200"
                    : "bg-gray-50"
                } ${
                  selectedDestination.to.id === loc.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loc.name}
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
            <button className="bg-white px-4 py-3 rounded-2xl w-full border border-black/10">
              {selectedDestination.to.name}
            </button>
          }
        >
          <div className="bg-gray-100 p-2">
            {locationData.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleSelect("to", loc)}
                className={`p-2 cursor-pointer ${
                  selectedDestination.to.id === loc.id
                    ? "bg-gray-200"
                    : "bg-gray-50"
                } ${
                  selectedDestination.from.id === loc.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loc.name}
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default ChooseDestination;
