import { useState } from "react";
import { Assets } from "../../res/assets";
import colors from "../../res/colors";
import { carouselImageData } from "../home/data/carouselImageData";
import BlurBackground from "../../shared/components/BlurBackground";
import TagComponent from "../../shared/components/TagComponent";
import FilledButton from "../../shared/buttons/FilledButton";
FilledButton

const BookmarkPage = () => {
  const [isBookmark, setIsBookmark] = useState({});
  const toggleBookmark = (i) => {
    setIsBookmark({ ...isBookmark, [i]: !isBookmark[i] });
  };
  return (
    <div className="mt-20 grid grid-cols-4 [@media(max-width:1288px)]:grid-cols-3 [@media(max-width:950px)]:grid-cols-1 gap-5 mx-5 mb-5">
      {carouselImageData.map((item, i) => (
        <div
          key={i}
          className="flex flex-col p-5 border border-black/8 rounded-2xl gap-2"
        >
          <div className="w-full h-70 overflow-hidden rounded-2xl relative">
            <img
              src={item.bg}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute top-5 right-5">
              <BlurBackground
                onClick={() => toggleBookmark(i)}
                blur="backdrop-blur-[5px]"
                background="bg-white/30"
                className="rounded-full w-fit p-2 shadow cursor-pointer"
              >
                <img
                  src={isBookmark[i] ? Assets.HeartFilled : Assets.HeartOutline}
                  className={`w-5 h-5 ${
                    !isBookmark[i] ? "gray-filter" : "red-filter jitter"
                  }`}
                />
              </BlurBackground>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <h1
              style={{ color: colors.hytam }}
              className="font-bold text-[1.2rem]"
            >
              {item.label}
            </h1>
            <div className="flex items-center gap-2">
              <img src={Assets.StarIcon} className="w-5 h-5" />
              <p className="gray-filter">{item.rating}</p>
            </div>
          </div>
          <TagComponent tagName={item.owner} />
          <div className="flex items-center gap-2 mt-1">
            <img
              src={Assets.LocationIcon}
              className="w-4.5 h-4.5 gray-filter"
            />
            <p className="gray-filter">{item.location}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <img className="w-5 h-5 gray-filter" src={Assets.GroupIcon} />
            <p className="gray-filter">{item.guest}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <h1
              style={{ color: colors.orange }}
              className="font-bold text-[1.3rem]"
            >
              <span className="text-[1.5rem]">Rp </span>
              {item.price}
            </h1>
            <FilledButton text="Visit" 
            // onClick={() => visitLocation(item)} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkPage;
