import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";

const FeedbackPage = ({ ratings = [] }) => {
  if (!ratings.length) return null;

  return (
    <div className="w-full flex flex-col justify-center items-start box-border">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[1.2rem] text-center [@media(max-width:800px)]:text-[1rem] mt-10 mb-5 ml-10"
      >
        Their Feedback
      </h1>
      <div
        style={{ color: colors.hytam }}
        className="w-full px-10 flex overflow-hidden overflow-x-auto gap-5 my-0"
      >
        {ratings.map((item, idx) => (
          <div
            className="bg-white rounded-2xl border border-black/10 w-100 shrink-0 box-border p-5"
            key={idx}
          >
            <div className="flex flex-col w-full">
              <div className="flex gap-5 w-full">
                <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={
                      item.user_profile_photo
                        ? `http://127.0.0.1:8000/storage/${item.user_profile_photo}`
                        : "images/default-profile.png"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold">{item.user_name}</h1>
                  <div className="flex gap-1">
                    <p className="text-[0.8rem]">{item.rate}</p>
                    <img className="w-4 h-4" src={Assets.StarIcon} alt="" />
                  </div>
                </div>
              </div>
              <p className="text-[0.9rem] mt-5 line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
