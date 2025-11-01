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
      className={`pl-5 h-full w-80 outline-none ml-3 rounded-[10px]`}
    />
  );
};

export default SearchLocation;
