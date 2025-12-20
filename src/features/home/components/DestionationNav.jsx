import SearchLocation from "./SearchLocation";
import BlurBackground from "../../../shared/components/BlurBackground";
import FilledButton from "../../../shared/buttons/FilledButton";
import { useNavigate } from "react-router-dom";
// import useDestinationStore from "../../Destionation/state/destionationStore";
import { useState } from "react";


const DestionationNav = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // const {searchDestinations  } = useDestinationStore();
  const handleSearch = () => {
    // searchDestinations();
    navigate("/destination-page", { state: { searchValue } });
  };


  return (
    <div className="absolute w-[90%] z-99">
      <BlurBackground
        border=" border border-white/10"
        rounded="rounded-2xl"
        className="flex justify-center items-center w-fit [@media(max-width:956px)]:w-full h-20 p-5 gap-3"
      >
        <SearchLocation value={searchValue} onChange={setSearchValue} />
        <FilledButton onClick={handleSearch} text="Search" />
      </BlurBackground>
    </div>
  );
};


export default DestionationNav;
