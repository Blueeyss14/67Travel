import { useState } from "react";
import Dropdown from "../../../shared/dropdown/Dropdown";
import { Assets } from "../../../res/assets";
import { carData } from "../data/carData";

const DetailBooking = ({setDropdownOpen }) => {
  const [selectedCar, setSelectedCar] = useState("Pilih Kendaraan");
  return (
    <div className="w-[35%] h-full box-border p-5">
      <Dropdown
        onOpen={() => setDropdownOpen(true)}
        onClose={() => setDropdownOpen(false)}
        className="w-full"
        trigger={
          <button className="bg-white px-4 py-2 rounded-2xl w-full border border-black/40">
            <div className="flex justify-between items-center">
              <p>{selectedCar}</p>
              <img src={Assets.LeftArrowIcon} className="w-4 h-4 -rotate-90" />
            </div>
          </button>
        }
      >
        <div className="p-2">
          {carData.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedCar(item.name)}
              className="p-2 hover:bg-white"
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default DetailBooking;
