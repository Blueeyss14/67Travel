import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import { config } from "../../../config/config";

const FeedbackPage = ({ ratings = [] }) => {
  if (!ratings.length) return null;

  return (
    <div className="w-full flex flex-col justify-center items-start box-border">
      <h1
        style={{ color: colors.hytam }}
        className="font-bold text-[1.2rem] text-center [@media(max-width:800px)]:text-[1rem] mt-10 mb-5"
      >
        Ratings
      </h1>
      <div
        style={{ color: colors.hytam }}
        className="w-full flex overflow-hidden overflow-x-auto gap-5 my-0"
      >
        {ratings.map((item, idx) => (
          <div
            className="bg-white rounded-2xl border border-black/10 w-100 shrink-0 box-border p-5"
            key={idx}
          >
            <div className="flex flex-col w-full">
              <div className="flex gap-3 w-full">
                <div className="h-6 w-6 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={
                      item.user_profile_photo
                        ? `${config.asset}storage/${item.user_profile_photo}`
                        : "images/annonymous.png"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold">{item.user_name}</h1>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <p className="text-[0.8rem] mr-2">({item.rate})</p>
                {Array.from({ length: item.rate }).map((_, i) => (
                  <img key={i} className="w-3.5 h-3.5" src={Assets.StarIcon} />
                ))}
              </div>
              <p className="text-[0.9rem] mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
