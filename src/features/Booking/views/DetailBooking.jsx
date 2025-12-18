import colors from "../../../res/colors";
import ChooseVehicle from "../components/ChooseVehicle";
import ChooseDate from "../components/ChooseDate";
import ChooseAccomodation from "../components/ChooseAccomodation";

const DetailBooking = ({ 
  setDropdownOpen, 
  mediaQuery, 
  width = "w-[35%]",
  selectedVehicle,
  setSelectedVehicle,
  selectedAccommodation,
  setSelectedAccommodation,
  selectedDate,
  setSelectedDate,
  visitorCount,
  setVisitorCount
}) => {
  
  return (
    <div
      className={`${width} h-full box-border pt-5 px-5 overflow-hidden overflow-y-auto ${mediaQuery}`}
    >
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1.7rem] mb-3"
      >
        Beli Tiket
      </h1>
      <div className="w-full border border-black/10 px-5 py-8 rounded-2xl">
        <ChooseDate 
          setDropdownOpen={setDropdownOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="w-full">
          <h1
            style={{ color: colors.primary }}
            className="font-bold text-[1rem] mb-3"
          >
            Pengunjung
          </h1>

          <input
            style={{ backgroundColor: colors.secondary }}
            type="number"
            placeholder="ex: 4"
            className="box-border px-5 py-3 h-full w-full outline-none rounded-[10px] border border-black/20 mb-5"
            value={visitorCount || ""}
            onChange={(e) => setVisitorCount(Number(e.target.value))}
          />
        </div>
        
        <ChooseVehicle 
          setDropdownOpen={setDropdownOpen}
          visitorCount={visitorCount}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
        />
        
        <ChooseAccomodation 
          setDropdownOpen={setDropdownOpen}
          selectedAccommodation={selectedAccommodation}
          setSelectedAccommodation={setSelectedAccommodation}
        />
      </div>
    </div>
  );
};

export default DetailBooking;