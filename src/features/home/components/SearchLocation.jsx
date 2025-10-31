import colors from "../../../res/colors";

const SearchLocation = () => {
  return (
      <input
      style={{backgroundColor : colors.secondary}}
        type="text"
        placeholder="Search Your Fav Location"
        className={`pl-5 h-full w-80 outline-none ml-3 rounded-[10px]`}
      />
  );
};

export default SearchLocation;
