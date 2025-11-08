import { useState, useEffect } from "react";
import { carouselImageData } from "../../home/data/carouselImageData";
import BlurBackground from "../../../shared/components/BlurBackground";
// import useDestinationStore from "../../Destionation/state/destionationStore";
import Login from "../components/Login";
import Regist from "../components/Regist";

import "react-calendar/dist/Calendar.css";
import colors from "../../../res/colors";

const AuthPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  //   const { setCheckInDate, setCheckOutDate } = useDestinationStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImageData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {showCalendar && (
        <BlurBackground
          background="bg-black/20"
          onClick={() => setShowCalendar(false)}
          className="w-full h-full z-9999 absolute"
        ></BlurBackground>
      )}
      <div>
        <div className="w-full h-screen relative overflow-hidden">
          <div className="bg-linear-to-b from-black/95 to-transparent w-full h-full absolute z-50 flex justify-center items-center flex-col">
            <div
              style={{ backgroundColor: colors.secondary }}
              className="box-border p-8 rounded-xl shadow-2xl max-w-md w-full mx-4"
            >
              {isLogin ? (
                <Login onToggle={() => setIsLogin(false)} />
              ) : (
                <Regist onToggle={() => setIsLogin(true)} />
              )}
            </div>
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
    </div>
  );
};

export default AuthPage;
