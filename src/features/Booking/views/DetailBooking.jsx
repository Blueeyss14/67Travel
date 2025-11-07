import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import { useBookingStore } from "../state/useBookingStore";
import ChooseVehicle from "../components/ChooseVehicle";
import ChooseLocation from "../components/ChooseLocation";
import ChooseDestination from "../components/chooseDestination";

const DetailBooking = ({ setDropdownOpen }) => {
  const { currentDay, days, nextDay, prevDay, deleteDay } = useBookingStore();
  const maxDay = Math.max(...Object.keys(days).map(Number));

  return (
    <div className="w-[35%] h-full box-border pt-5 px-5 overflow-hidden overflow-y-auto">
      {/* Header Day */}
      <div className="w-full justify-between items-center flex mb-5">
        <div className="flex justify-center items-center gap-5">
          <h1 style={{ color: colors.primary }} className="text-[2rem] font-bold">
            Day {currentDay}
          </h1>
          <div className="flex gap-3 blue-filter">
            {currentDay > 1 && (
              <div className="box-border p-3 rounded-full shadow">
                <img
                  src={Assets.LeftArrowIcon}
                  className="w-4 h-4 cursor-pointer"
                  onClick={prevDay}
                />
              </div>
            )}
            {currentDay < maxDay && (
              <div className="box-border p-3 rounded-full shadow">
                <img
                  src={Assets.LeftArrowIcon}
                  className="w-4 h-4 rotate-180 cursor-pointer"
                  onClick={nextDay}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentDay !== 1 && (
            <div className="box-border p-3 rounded-full shadow cursor-pointer ">
              <img
                src={Assets.MinusIcon}
                className="w-4 h-4 blue-filter"
                onClick={() => deleteDay(currentDay)}
              />
            </div>
          )}

          <div className="box-border p-3 rounded-full shadow  cursor-pointer ">
            <img
              src={Assets.PlusIcon}
              className="w-4 h-4 blue-filter"
              onClick={nextDay}
            />
          </div>
        </div>
      </div>

      <div className="w-full border border-black/10 px-5 py-8 rounded-2xl">
        <ChooseVehicle setDropdownOpen={setDropdownOpen} />
        <ChooseLocation setDropdownOpen={setDropdownOpen} />
        <ChooseDestination setDropdownOpen={setDropdownOpen} />
      </div>
    </div>
  );
};

export default DetailBooking;
