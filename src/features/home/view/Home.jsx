import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { carouselImageData } from "../data/carouselImageData";
import BlurBackground from "../../../shared/components/BlurBackground";
import PromotionCard from "../../../shared/components/PromotionCard";
import ExplorerPage from "./ExplorerPage";
import DestionationNav from "../components/DestionationNav";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);

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
          onClick={() => setShowCalendar(false)}
          className="w-full h-full z-9999 absolute"
        >
          <div className="w-fit h-fit" onClick={(e) => e.stopPropagation()}>
            <Calendar
              onChange={(date) => console.log("Tanggal dipilih:", date)}
              className="rounded-xl absolute  top-100 left-115 p-2"
            />
          </div>
        </BlurBackground>
      )}
      <div>
        <Navbar />

        {/* <div className="fixed bg-amber-200 h-10 w-full z-99 flex justify-center items-center">
          <div className="custom-clipper h-full w-1/2">

          </div>
        </div> */}
        <div className="w-full h-[70vh] relative overflow-hidden">
          <div className="bg-linear-to-b from-black/95 to-transparent w-full h-full absolute z-50 flex justify-center items-center flex-col">
            {/* <div className="w-[70%] flex justify-center items-center flex-col text-white">
              <h1 className="text-[3rem] font-bold mb-1">67Travel</h1>
              <p className="text-center mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident ab, eligendi dolorum temporibus at et. Rerum,
                explicabo!
              </p>
            </div> */}
            {/* <SearchLocation /> */}
            <DestionationNav
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
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
          {carouselImageData.slice(0, 2).map((img, index) => (
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
