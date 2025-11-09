import Dropdown from "../../../shared/dropdown/Dropdown";
import { Assets } from "../../../res/assets";
import { carData } from "../data/carData";
import colors from "../../../res/colors";
import { useBookingStore } from "../state/useBookingStore";

import toast from "react-hot-toast";

const ChooseVehicle = ({ setDropdownOpen }) => {
  const { currentDay, days, setSelectedCar } = useBookingStore();
  const selectedCar = days[currentDay]?.selectedCar || {
    id: null,
    name: "Pilih Kendaraan",
  };
  const visitorCount = days[currentDay]?.visitorCount || 0;

  const handleSelectCar = (item) => {
    if (visitorCount > item.maxPassenger) {
      toast.error("Jumlah penumpang melebihi maksimal kendaraan!", {
        position: "top-center",
        style: {
          borderRadius: "12px",
          background: "#333",
          color: "#fff",
          padding: "12px 16px",
          fontSize: "14px",
        },
      });
      return;
    }
    setSelectedCar(currentDay, { id: item.uuid, name: item.name });
  };

  return (
    <div className="w-full mb-5">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1rem] mb-3"
      >
        Pilih Kendaraan
      </h1>

      <Dropdown
        onOpen={() => setDropdownOpen(true)}
        onClose={() => setDropdownOpen(false)}
        className="w-full"
        trigger={
          <button className="bg-white px-4 py-2 rounded-[10px] w-full border border-black/20 cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <p style={{ color: colors.hytam }}>{selectedCar.name}</p>
              <img
                src={Assets.LeftArrowIcon}
                className="w-3 h-3 -rotate-90 gray-filter"
              />
            </div>
          </button>
        }
      >
        <div style={{ color: colors.hytam }} className="bg-gray-100">
          {carData.map((item) => (
            <div
              key={item.uuid}
              onClick={() => handleSelectCar(item)}
              className={`p-5 hover:bg-gray-200 cursor-pointer flex flex-col w-full ${
                selectedCar.id === item.uuid ? "bg-gray-200" : "bg-gray-50"
              } shadow`}
            >
              <div className="flex items-center gap-3">
                <div className="w-15 h-15 bg-amber-200 overflow-hidden rounded-lg">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>
                <div className="w-full">
                  <p style={{ color: colors.hytam }} className="font-semibold">
                    {item.name}
                  </p>
                  <div className="w-full justify-between flex items-center">
                    <p
                      style={{ color: colors.primary }}
                      className="text-[0.9rem]"
                    >
                      Rp.{item.price}
                    </p>
                    <p
                      style={{ color: colors.hytam }}
                      className="text-[0.9rem]"
                    >
                      Max: {item.maxPassenger}
                    </p>
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

export default ChooseVehicle;
