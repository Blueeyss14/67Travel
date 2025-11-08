import { useEffect, useState } from "react";
import { useBookingStore } from "../state/useBookingStore";
import FilledButton from "../../../shared/buttons/FilledButton";
import { useNavigate } from "react-router-dom";
import useMapStore from "../state/useMapStore";
import BlurBackground from "../../../shared/components/BlurBackground";
import colors from "../../../res/colors";
import { Assets } from "../../../res/assets";
import Rating from "../components/Rating";

const OnTheWay = () => {
  const navigate = useNavigate();
  const { days, resetBooking } = useBookingStore();
  const { resetMap } = useMapStore();
  const totalDays = Object.keys(days).length;

  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const [currentImg, setCurrentImg] = useState(
    days[1]?.selectedLocation?.bg || "/images/image1.jpg"
  );
  const [nextImg, setNextImg] = useState(null);
  const [fade, setFade] = useState(false);

  const current = days[currentDay];
  const from = current?.selectedDestination?.from?.name || "";
  const to = current?.selectedDestination?.to?.name || "";
  const locationName = current?.selectedLocation?.name || "";

  useEffect(() => {
    if (done) return;

    let time = 0;
    const duration = 60;
    const interval = setInterval(() => {
      time++;
      setProgress((time / duration) * 100);
      if (time >= duration) {
        clearInterval(interval);
        if (currentDay < totalDays) {
          const nextDay = currentDay + 1;
          const newImg =
            days[nextDay]?.selectedLocation?.bg || "/images/image1.jpg";

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
  }, [currentDay, totalDays, done, days]);

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
    <div
      style={{ color: colors.secondary }}
      className="relative w-full h-screen overflow-hidden"
    >
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
        background="bg-black/10"
        blur="backdrop-blur-[30px]"
        className="absolute w-full h-full"
      />
      <div className="w-full h-screen absolute flex flex-col gap-1 justify-end items-end box-border p-5">
        {!done ? (
          <>
            <h1 className="text-3xl font-bold mb-2 [@media(max-width:700px)]:text-[1.5rem]">
              Day {currentDay}: {locationName}
            </h1>
            <h2 className="text-xl mb-5 [@media(max-width:700px)]:text-[0.9rem]">
              {from} menuju {to}
            </h2>
            <div className="w-1/2 h-2 bg-gray-300 rounded-full overflow-hidden shadow-2xl shadow-white">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm">{Math.floor(progress)}%</p>
          </>
        ) : (
            <div className="flex flex-col justify-center items-center absolute w-full h-screen pl-5 box-border">
              <h1 className="text-2xl font-bold text-white mb-3 text-center [@media(max-width:700px)]:text-[1rem]">
                Anda sudah sampai di tujuan!
              </h1>
              <Rating/>
              <FilledButton margin="mt-6" onClick={backToHome} text="Back to Home" />
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
