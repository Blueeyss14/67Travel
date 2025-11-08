import SearchLocation from "./SearchLocation";
import BlurBackground from "../../../shared/components/BlurBackground";
import FilledButton from "../../../shared/buttons/FilledButton";
import IconButton from "../../../shared/buttons/IconButton";
import { useNavigate } from "react-router-dom";
import useDestinationStore from "../../Destionation/state/destionationStore";

const DestionationNav = ({
  showCalendar,
  setShowCalendar,
  setCalendarType,
}) => {
  const navigate = useNavigate();
  const toggle = () => setShowCalendar(!showCalendar);

  const { checkInDate, checkOutDate, searchDestinations  } = useDestinationStore();

  const toggleCheckIn = () => {
    setCalendarType("checkIn");
    toggle();
  };

  const toggleCheckOut = () => {
    setCalendarType("checkOut");
    toggle();
  };

  const handleSearch = () => {
    // if (!checkInDate) {
    //   alert("Pilih tanggal check in dulu");
    //   return;
    // }
    searchDestinations();
    navigate("/destination-page");
  };

  return (
    <div className="absolute w-[90%] z-99">
      <BlurBackground
        border=" border border-white/10"
        rounded="rounded-2xl"
        className="flex justify-center items-center w-fit [@media(max-width:956px)]:w-full h-20 p-5 gap-3"
      >
        <SearchLocation />
        {/* <div className="flex h-full overflow-hidden rounded-[10px]">
          <IconButton
            onClick={toggleCheckIn}
            rounded="rounded-0"
            text={
              checkInDate
                ? `${checkInDate.getDate()}/${
                    checkInDate.getMonth() + 1
                  }/${checkInDate.getFullYear()}`
                : "Check In"
            }
          />
          <IconButton
            onClick={toggleCheckOut}
            rounded="rounded-0"
            text={
              checkOutDate
                ? `${checkOutDate.getDate()}/${
                    checkOutDate.getMonth() + 1
                  }/${checkOutDate.getFullYear()}`
                : "Check Out"
            }
          />
        </div> */}
        {/* <IconButton text="Guest" /> */}
        <FilledButton onClick={handleSearch} text="Search" />
      </BlurBackground>
    </div>
  );
};

export default DestionationNav;
