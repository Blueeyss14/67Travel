import { useEffect, useState } from "react";
import { useBookingStore } from "../state/useBookingStore";
import FilledButton from "../../../shared/buttons/FilledButton";
import { useNavigate } from "react-router-dom";
import useMapStore from "../state/useMapStore";
import BlurBackground from "../../../shared/components/BlurBackground";
import { carouselImageData } from "../../home/data/carouselImageData";

const OnTheWay = () => {
  const navigate = useNavigate();
  const { days, resetBooking } = useBookingStore();
  const { resetMap } = useMapStore();
  const totalDays = Object.keys(days).length;

  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const [currentImg, setCurrentImg] = useState(carouselImageData[0].bg);
  const [nextImg, setNextImg] = useState(null);
  const [fade, setFade] = useState(false);

  const current = days[currentDay];
  const from = current?.selectedDestination?.from?.name || "";
  const to = current?.selectedDestination?.to?.name || "";

  useEffect(() => {
    if (done) return;

    let time = 0;
    const duration = 10;
    const interval = setInterval(() => {
      time++;
      setProgress((time / duration) * 100);
      if (time >= duration) {
        clearInterval(interval);
        if (currentDay < totalDays) {
          const nextDay = currentDay + 1;
          const newImg =
            carouselImageData[(nextDay - 1) % carouselImageData.length].bg;

          const img = new Image();
          img.src = newImg;
          img.onload = () => {
            setNextImg(newImg);
            setFade(true);
            setTimeout(() => {
              setCurrentImg(newImg);
              setNextImg(null);
              setFade(false);
              setCurrentDay(nextDay);
              setProgress(0);
            }, 1000);
          };
        } else {
          setDone(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDay, totalDays, done]);

  useEffect(() => {
    if (done) {
      resetBooking();
      resetMap();
    }
  }, [done, resetBooking, resetMap]);

  const backToHome = () => {
    resetBooking();
    navigate("/", { replace: true });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={currentImg}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100"
        alt=""
      />
      {nextImg && (
        <img
          src={nextImg}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          alt=""
        />
      )}

      <BlurBackground
        blur="backdrop-blur-[30px]"
        className="absolute w-full h-full"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full">
        {!done ? (
          <>
            <h1 className="text-2xl font-bold mb-3">
              Day {currentDay}: {from} → {to}
            </h1>
            <div className="w-64 h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-3 bg-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm">{Math.floor(progress)}%</p>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-green-400 mb-3">
              Anda sudah sampai di tujuan!
            </h1>
            <FilledButton onClick={backToHome} text="Back to Home" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OnTheWay;

// import { useEffect, useState } from "react";
// import { useBookingStore } from "../state/useBookingStore";
// import FilledButton from "../../../shared/buttons/FilledButton";
// import { useNavigate } from "react-router-dom";
// import useMapStore from "../state/useMapStore";

// const OnTheWay = () => {
//   const navigate = useNavigate();
//   const { days, resetBooking } = useBookingStore();
//   const { resetMap } = useMapStore();
//   const totalDays = Object.keys(days).length;
//   const [currentDay, setCurrentDay] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const [done, setDone] = useState(false);

//   const current = days[currentDay];
//   const from = current?.selectedDestination?.from?.name || "";
//   const to = current?.selectedDestination?.to?.name || "";

//   useEffect(() => {
//     if (done) return;

//     let time = 0;
//     const duration = 30;
//     const interval = setInterval(() => {
//       time++;
//       setProgress((time / duration) * 100);
//       if (time >= duration) {
//         clearInterval(interval);
//         if (currentDay < totalDays) {
//           setCurrentDay((prev) => prev + 1);
//           setProgress(0);
//         } else {
//           setDone(true);
//         }
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentDay, totalDays, done]);

//   useEffect(() => {
//     if (done) {
//       resetBooking();
//       resetMap();
//     }
//   }, [done, resetBooking, resetMap]);

//   const backToHome = () => {
//     resetBooking();
//     navigate("/", { replace: true });
//   };

//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-5">
//       {!done ? (
//         <>
//           <h1 className="text-xl font-bold mb-4">
//             Day {currentDay}: {from} → {to}
//           </h1>
//           <div className="w-full max-w-md">
//             <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className="h-3 bg-blue-500 transition-all duration-500"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
//           <p className="mt-2 text-sm text-gray-600">
//             {Math.floor(progress)}% / {Math.floor((progress / 100) * 30)}s
//           </p>
//         </>
//       ) : (
//         <div>
//           <h1 className="text-2xl font-bold text-green-600">
//             Anda sudah sampai di tujuan!
//           </h1>
//           <FilledButton onClick={backToHome} text="Back to Home" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OnTheWay;
