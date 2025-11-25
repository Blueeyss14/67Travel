import { useState } from "react";
import { Assets } from "../../res/assets";

const TicketList = ({ title = "Title", rating = 0, onClick }) => {
  const [isClicked, setIsClicked] = useState(true);
  return (
    <div 
    onClick={onClick}
    className="w-full flex items-center p-2 border border-black/15 gap-3 hover:bg-gray-100 cursor-pointer mb-3 rounded-[5px]">
      <div className="w-10 h-10 bg-gray-300 overflow-hidden rounded-[5px] ">
        <img src="" alt="" />
      </div>
      <div className="flex-1 flex-col">
        <h1>{title}</h1>
        <div className="flex items-center gap-2">
          <img
            src={Assets.StarFilledIcon}
            className="w-3.5 h-3.5 yellow-filter"
          />
          <p className="text-[0.9rem]">{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
