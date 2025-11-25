import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { carouselImageData } from "../data/carouselImageData";
import BlurBackground from "../../../shared/components/BlurBackground";
import PromotionCard from "../../../shared/components/PromotionCard";
import ExplorerPage from "./ExplorerPage";
import DestionationNav from "../components/DestionationNav";

import "react-calendar/dist/Calendar.css";
import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(false);

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

  // function profileHandle() {
  //   document.getElementById("fileInput").click();
  // }

  
  function handleNavigation(navigation) {
    navigate(navigation);
  }

  const items = [
    {
      label: "Edit Profile",
      page: ()=> handleNavigation("/profile-page"),
      icon: Assets.UserIcon,
    },
    {
      label: "Bookmark",
      page: () => handleNavigation("/bookmark-page"),
      icon: Assets.BookmarkFilledIcon,
    },
    {
      label: "Tiket",
      page: () => handleNavigation("/ticket-list-page"),
      icon: Assets.TicketIcon,
    },
    {
      label: "Logout",
      page: () => handleNavigation("/"),
      icon: Assets.LogoutIcon,
    },
  ];

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
          <div className="rounded-2xl p-2 mt-3 bg-white min-w-50">
            <div className="w-full box-border p-2 bg-gray-200 rounded-[10px] mb-2 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
                  <img
                    src="images/image1.jpg"
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </div>
                <h1 className="font-medium text-center">Felicia</h1>
              </div>
              <p className="text-[0.8rem]">felicia@gmail.com</p>
            </div>
            {/* PROFILE */}
            {items.map((item) => (
              <div
                className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded-2xl"
                onClick={item.page}
              >
                <img src={item.icon} className="w-4 h-4 gray-filter" />
                <p style={{ color: colors.hytam }} className="text-[0.9rem]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </BlurBackground>
      )}

      <div>
        <Navbar setIsOpen={() => setIsProfileOpen(!isProfileOpen)} />

        <div className="w-full h-[70vh] relative overflow-hidden">
          <div className="bg-linear-to-b from-black/95 to-transparent w-full h-full absolute z-50 flex justify-center items-center flex-col">
            <DestionationNav />
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
    </div>
  );
};

export default Home;
