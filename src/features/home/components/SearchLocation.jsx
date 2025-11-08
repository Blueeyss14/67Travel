import { useState } from "react";
import colors from "../../../res/colors";
import useDestinationStore from "../../Destionation/state/destionationStore";

const SearchLocation = () => {
  const [value, setValue] = useState("");
  const { setSearchQuery } = useDestinationStore();

  const handleChange = (e) => {
    setValue(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      style={{ backgroundColor: colors.secondary }}
      type="text"
      placeholder="Search Your Fav Location"
      className={`box-border px-5 h-full w-150 [@media(max-width:956px)]:w-full outline-none ml-3 rounded-[10px]`}
    />
  );
};

export default SearchLocation;
