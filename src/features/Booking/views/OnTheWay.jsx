import { useEffect, useState } from "react";
import { useBookingStore } from "../state/useBookingStore";
import FilledButton from "../../../shared/buttons/FilledButton";
import { useNavigate } from "react-router-dom";
import useMapStore from "../state/useMapStore";

const OnTheWay = () => {
  const navigate = useNavigate();
  const { days, resetBooking } = useBookingStore();
  const { resetMap } = useMapStore();
  const totalDays = Object.keys(days).length;
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const current = days[currentDay];
  const from = current?.selectedDestination?.from?.name || "";
  const to = current?.selectedDestination?.to?.name || "";

  useEffect(() => {
    if (done) return;

    let time = 0;
    const duration = 30;
    const interval = setInterval(() => {
      time++;
      setProgress((time / duration) * 100);
      if (time >= duration) {
        clearInterval(interval);
        if (currentDay < totalDays) {
          setCurrentDay((prev) => prev + 1);
          setProgress(0);
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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-5">
      {!done ? (
        <>
          <h1 className="text-xl font-bold mb-4">
            Day {currentDay}: {from} → {to}
          </h1>
          <div className="w-full max-w-md">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {Math.floor(progress)}% / {Math.floor((progress / 100) * 30)}s
          </p>
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-green-600">
            Anda sudah sampai di tujuan!
          </h1>
          <FilledButton onClick={backToHome} text="Back to Home" />
        </div>
      )}
    </div>
  );
};

export default OnTheWay;
