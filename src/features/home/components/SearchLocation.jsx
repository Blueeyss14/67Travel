import { useState } from "react";
import colors from "../../../res/colors";
// import useDestinationStore from "../../Destionation/state/destionationStore";

const SearchLocation = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || "");


  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };


  return (
    <input
      value={inputValue}
      onChange={handleChange}
      style={{ backgroundColor: colors.secondary }}
      type="text"
      placeholder="Search Your Fav Location"
      className={`box-border px-5 h-full w-150 [@media(max-width:956px)]:w-full outline-none ml-3 rounded-[10px]`}
    />
  );
};


export default SearchLocation;
