import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { carouselImageData } from "../data/carouselImageData";
import BlurBackground from "../../../shared/components/BlurBackground";
import PromotionCard from "../../../shared/components/PromotionCard";
import ExplorerPage from "./ExplorerPage";
import DestionationNav from "../components/DestionationNav";
// import useDestinationStore from "../../Destionation/state/destionationStore";
import FeedbackPage from "./FeedbackPage";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();
  // const [calendarType, setCalendarType] = useState(null);
  const [isSmall, setIsSmall] = useState(false);
  // const { setCheckInDate, setCheckOutDate } = useDestinationStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImageData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 956);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayData = isSmall
    ? carouselImageData.slice(0, 1)
    : carouselImageData.slice(0, 2);

  return (
    <div className="relative">
      {isProfileOpen && (
        <BlurBackground
          background="bg-black/20"
          onClick={() => setIsProfileOpen(false)}
          className="w-full h-full z-9999 fixed flex justify-end items-start box-border p-4 cursor-pointer"
        >
          <div className="rounded-2xl p-2 mt-3 bg-white">
            {/* PROFILE */}
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded-2xl"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img src={Assets.UserIcon} className="w-4 h-4 gray-filter" />
              <p style={{ color: colors.hytam }} className="text-[0.9rem]">
                Change Profile Picture
              </p>
            </div>
            {/* BOOKMARK */}
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded-2xl"
              onClick={() => navigate("/destination-page")}
            >
              <img
                src={Assets.BookmarkFilledIcon}
                className="w-4 h-4 gray-filter"
              />
              <p style={{ color: colors.hytam }} className="text-[0.9rem]">
                Bookmark
              </p>
            </div>
            {/* LOGOUT */}
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded-2xl"
              onClick={() => navigate("/", { replace: true })}
            >
              <img src={Assets.LogoutIcon} className="w-4 h-4 gray-filter" />
              <p style={{ color: colors.hytam }} className="text-[0.9rem]">
                Logout
              </p>
            </div>
          </div>
        </BlurBackground>
      )}
      {/* {showCalendar && (
        <BlurBackground
          background="bg-black/20"
          onClick={() => setShowCalendar(false)}
          className="w-full h-full z-9999 absolute"
        >
          <div className="w-fit h-fit" onClick={(e) => e.stopPropagation()}>
            <Calendar
              onChange={(date) => {
                if (calendarType === "checkIn") {
                  setCheckInDate(date);
                }

                if (calendarType === "checkOut") {
                  const { checkInDate } = useDestinationStore.getState();
                  if (checkInDate && date < checkInDate) {
                    alert("Tanggal check-out tidak boleh sebelum check-in!");
                    return;
                  }
                  setCheckOutDate(date);
                }

                setShowCalendar(false);
              }}
              className="rounded-xl absolute top-100 left-115 p-2"
            />
          </div>
        </BlurBackground>
      )} */}
      <div>
        <Navbar setIsOpen={() => setIsProfileOpen(!isProfileOpen)} />

        <div className="w-full h-[70vh] relative overflow-hidden">
          <div className="bg-linear-to-b from-black/95 to-transparent w-full h-full absolute z-50 flex justify-center items-center flex-col">
            <DestionationNav
            // showCalendar={showCalendar}
            // setShowCalendar={setShowCalendar}
            // setCalendarType={setCalendarType}
            />
          </div>
          <BlurBackground className="absolute w-full h-full z-40"></BlurBackground>
          {carouselImageData.map((img, index) => (
            <img
              key={index}
              src={img.bg}
              className={`
                w-full h-full object-cover absolute top-0 left-0
                transition-opacity duration-1000
                ${index === currentIndex ? "opacity-100" : "opacity-0"}
              `}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-screen absolute top-0 left-0 z-99 pointer-events-none flex flex-col justify-end items-center">
        <div className="w-[90%] h-[60vh] flex items-center justify-center pointer-events-none gap-10">
          {displayData.map((img, index) => (
            <PromotionCard
              key={index}
              imageUrl={img.bg}
              title={img.label}
              subTitle={img.owner}
              description={img.description}
              textButton="Visit"
            />
          ))}
        </div>
      </div>

      <ExplorerPage />
      <FeedbackPage />
    </div>
  );
};

export default Home;
