import SearchLocation from "./SearchLocation";
import BlurBackground from "../../../shared/components/BlurBackground";
import FilledButton from "../../../shared/buttons/FilledButton";
import IconButton from "../../../shared/buttons/IconButton";
const DestionationNav = ({ showCalendar, setShowCalendar }) => {
  const toggle = () => setShowCalendar(!showCalendar);
  return (
    <div className="absolute w-[90%] z-99">
      <BlurBackground
        border=" border border-white/10"
        rounded="rounded-2xl"
        className="flex justify-center items-center w-fit h-20 p-5 gap-3"
      >
        <SearchLocation />
        <div className="flex h-full overflow-hidden rounded-[10px]">
          {/* <div className="h-full flex justify-center items-center border-r border-gray-400/50 px-3 hover:shadow-[inset_2px_2px_10px_rgba(0,0,0,0.50)] transition-all duration-200 cursor-pointer">
            <h1>Check In</h1>
          </div> */}
          <IconButton onClick={toggle} rounded="rounded-0" text="Check In" />
          <IconButton rounded="rounded-0" text="Check Out" />
        </div>
        <IconButton text="Guest" />
        <FilledButton text="Search" />
        {/* {showCalendar && (
          <div className="absolute top-24 bg-white p-4 rounded-lg shadow-lg">
            <div className="w-full h-200 bg-amber-300 z-999">
              
            </div>
          </div>
        )} */}
      </BlurBackground>
    </div>
  );
};

export default DestionationNav;
