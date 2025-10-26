import FilledButton from "../../../shared/buttons/FilledButton";

const SearchLocation = () => {
  return (
    <div className="w-[80%] p-2 bg-white flex items-center justify-between px-2 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Search Your Fav Location"
        className="w-full h-full outline-none ml-3"
      />
      <FilledButton text="Search"/>
    </div>
  );
};

export default SearchLocation;
