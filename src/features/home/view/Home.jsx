import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { carouselImageData } from "../data/carouselImageData";
import BlurBackground from "../../../shared/components/BlurBackground";
import SearchLocation from "../components/SearchLocation";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImageData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full h-[70vh] relative overflow-hidden">
        <div className="bg-linear-to-b from-black/90 to-transparent w-full h-full absolute z-50 flex justify-center items-center flex-col">
          <div className="w-[70%] flex justify-center items-center flex-col text-white">
            <h1 className="text-[3rem] font-bold mb-1">67Travel</h1>
            <p className="text-center mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ab, eligendi dolorum temporibus at et. Rerum, explicabo!
            </p>
          </div>
          <SearchLocation />
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
  );
};

export default Home;
