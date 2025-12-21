import { Assets } from "../../res/assets";
import colors from "../../res/colors";
import BlurBackground from "../../shared/components/BlurBackground";
import TagComponent from "../../shared/components/TagComponent";
import PrimaryButton from "../../shared/buttons/PrimaryButton";
import useDestinations from "../Destionation/hook/useDestination";
import { useNavigate } from "react-router-dom";

const BookmarkPage = () => {
  const navigate = useNavigate();
  const { destinations, isBookmark, toggleBookmark, loading } =
    useDestinations();

  const bookmarkedDestinations = destinations.filter(
    (_, i) => isBookmark[i] === true
  );

  const visitLocation = (item) => {
    navigate("/booking-page", {
      state: { selectedLocation: item },
    });
  };
  if (loading) {
    return (
      <div className="min-h-screen  from-gray-50 to-white p-4">
        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[2rem] mb-6"
        >
          Bookmark
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
            <p className="mt-4 text-gray-500">Memuat bookmark...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[2rem] m-6"
      >
        Bookmark
      </h1>
      {bookmarkedDestinations.length > 0 ? (
        <div className="mt-20 grid grid-cols-4 [@media(max-width:1288px)]:grid-cols-3 [@media(max-width:950px)]:grid-cols-1 gap-5 mx-5 mb-5">
          {bookmarkedDestinations.map((item) => {
            const index = destinations.findIndex((d) => d.id === item.id);

            return (
              <div
                key={item.id}
                className="flex flex-col p-5 border border-black/8 rounded-2xl gap-2"
              >
                <div className="w-full h-70 overflow-hidden rounded-2xl relative">
                  <img
                    src={item.bg}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute top-5 right-5">
                    <BlurBackground
                      onClick={() => toggleBookmark(index, item.id)}
                      blur="backdrop-blur-[5px]"
                      background="bg-white/30"
                      className="rounded-full w-fit p-2 shadow cursor-pointer"
                    >
                      <img
                        src={Assets.HeartFilled}
                        className="w-5 h-5 red-filter jitter"
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

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <img
                      src={Assets.LocationIcon}
                      className="w-4 h-4 gray-filter"
                    />
                  </div>
                  <span className="gray-filter text-sm">{item.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <img
                      src={Assets.GroupIcon}
                      className="w-4 h-4 gray-filter"
                    />
                  </div>
                  <span className="gray-filter text-sm">{item.guest}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500">Mulai dari</span>
                      <h3
                        style={{ color: colors.orange }}
                        className="font-bold text-xl"
                      >
                        Rp {item.price}
                        <span className="text-gray-500 text-sm font-normal">
                          {" "}
                          /hari
                        </span>
                      </h3>
                    </div>
                    <PrimaryButton
                      text="Visit"
                      className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md active:scale-95"
                      onClick={() => visitLocation(item)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Tidak ada destinasi yang disimpan
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Cari destinasi anda
          </p>
          <button
          style={{backgroundColor: colors.primary}}
            onClick={() => navigate("/destination-page")}
            className="px-6 py-3 text-white rounded-lg font-semibold transition-colors shadow-sm cursor-pointer"
          >
            Cari Destinasi
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
