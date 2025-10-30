import SearchLocation from "./SearchLocation";
import BlurBackground from "../../../shared/components/BlurBackground";
import FilledButton from "../../../shared/buttons/FilledButton";
const DestionationNav = () => {
  return (
    <div className="absolute w-[90%] z-99">
      <BlurBackground
        border=" border border-white/10"
        rounded="rounded-2xl"
        className="flex justify-center items-center w-fit h-20 p-5 gap-3"
      >
        <SearchLocation />
        <div className="flex h-full bg-white overflow-hidden rounded-[10px]">
          <div className="h-full flex justify-center items-center border-r border-gray-400/50 px-3 hover:shadow-[inset_2px_2px_10px_rgba(0,0,0,0.50)] transition-all duration-200 cursor-pointer">
            <h1>Check In</h1>
          </div>
          <div className="h-full flex justify-center items-center px-3">
            <h1>Check Out</h1>
          </div>
        </div>

        <div className="h-full flex justify-center items-center px-3 bg-white rounded-[10px]">
          <h1>Guest</h1>
        </div>

        <FilledButton text="Search" />
      </BlurBackground>
    </div>
  );
};

export default DestionationNav;
