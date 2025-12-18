import Dropdown from "../../../shared/dropdown/Dropdown";
import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import useAccomodation from "../hook/useAccommodation";

const ChooseAccomodation = ({ setDropdownOpen, selectedAccommodation, setSelectedAccommodation }) => {
  const { accommodations } = useAccomodation();

  return (
    <div className="w-full mb-5">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1rem] mb-3"
      >
        Pilih Akomodasi
      </h1>

      <Dropdown
        onOpen={() => setDropdownOpen(true)}
        onClose={() => setDropdownOpen(false)}
        className="w-full"
        trigger={
          <button className="bg-white px-4 py-2 rounded-[10px] w-full border border-black/20 cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <p style={{ color: colors.hytam }}>{selectedAccommodation.name}</p>
              <img
                src={Assets.LeftArrowIcon}
                className="w-3 h-3 -rotate-90 gray-filter"
              />
            </div>
          </button>
        }
      >
        <div style={{ color: colors.hytam }} className="bg-gray-100">
          {accommodations.map((item) => (
            <div
              key={item.uuid}
              onClick={() => setSelectedAccommodation(item)}
              className={`p-5 hover:bg-gray-200 cursor-pointer flex flex-col w-full ${
                selectedAccommodation.uuid === item.uuid ? "bg-gray-200" : "bg-gray-50"
              } shadow`}
            >
              <div className="flex items-center gap-3">
                <div className="w-15 h-15 overflow-hidden rounded-lg">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>
                <div className="w-full">
                  <p style={{ color: colors.hytam }} className="font-semibold">
                    {item.name}
                  </p>
                  <p style={{ color: colors.primary }} className="text-[0.9rem]">
                    Rp.{item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default ChooseAccomodation;