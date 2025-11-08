import { useState } from "react";
import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import FilledButton from "../../../shared/buttons/FilledButton";

const Rating = () => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-gray-50 w-200 box-border p-5 rounded-2xl shadow-2xl flex flex-col gap-3 [@media(max-width:1100px)]:w-[80%]">
      <div className="flex justify-start items-center gap-3">
        <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
          <img src="images/image1.jpg" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-bold" style={{ color: colors.hytam }}>
          User
        </h1>
      </div>
      <textarea
        placeholder="Berikan rating!"
        name="rating"
        className="h-30 w-full resize-none border-none outline-none focus:outline-none bg-gray-200 rounded-2xl box-border p-3"
        style={{ color: colors.hytam }}
      ></textarea>
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={
                star <= (hovered || selected)
                  ? Assets.StarFilledIcon
                  : Assets.StarOutlinedIcon
              }
              className={`w-6 h-6 [@media(max-width:700px)]:w-4 [@media(max-width:700px)]:h-4 cursor-pointer yellow-filter`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(star)}
            />
          ))}
        </div>
        <FilledButton 
        textSize="[@media(max-width:700px)]:text-[0.8rem]"
        text="Berikan Rating" />
      </div>
    </div>
  );
};

export default Rating;
