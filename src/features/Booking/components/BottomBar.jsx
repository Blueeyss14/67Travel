import { useNavigate } from "react-router-dom";
import { Assets } from "../../../res/assets";
import FilledButton from "../../../shared/buttons/FilledButton";
import { carouselImageData } from "../../home/data/carouselImageData";
import { carData } from "../data/carData";
import { locationData } from "../data/locationData";
import { useBookingStore } from "../state/useBookingStore";

const BottomBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { currentDay, days } = useBookingStore();

  const selectedCar = days[currentDay]?.selectedCar;
  const selectedLocation = days[currentDay]?.selectedLocation;
  const selectedDestination = days[currentDay]?.selectedDestination;

  const startDestination = () => {
    const allFilled = Object.values(days).every((day) => {
      const { selectedCar, selectedLocation, selectedDestination } = day;
      return (
        selectedCar?.id &&
        selectedLocation?.id &&
        selectedDestination?.from?.id &&
        selectedDestination?.to?.id
      );
    });

    if (!allFilled) {
      alert("Isi terlebih dahulu semua Day sebelum Check Out");
      return;
    }

    navigate("/on-the-way");
  };

  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const parsePrice = (val) => {
    if (!val) return 0;
    return Number(String(val).replace(/[^\d]/g, "")) || 0;
  };

  const totalPrice = Object.values(days).reduce((acc, day) => {
    const car = carData.find((c) => c.uuid === day.selectedCar?.id);
    const loc = carouselImageData.find(
      (l) => l.id === day.selectedLocation?.id
    );
    const from = locationData.find(
      (l) => l.id === day.selectedDestination?.from?.id
    );
    const to = locationData.find(
      (l) => l.id === day.selectedDestination?.to?.id
    );

    const dayTotal =
      parsePrice(car?.price) +
      parsePrice(loc?.price) +
      parsePrice(from?.price) +
      parsePrice(to?.price);

    return acc + dayTotal;
  }, 0);

  return (
    <div className="bg-white w-full h-20 flex justify-end z-99999 items-center gap-5 shadow-[1px_1px_15px_rgba(0,0,0,0.1)] box-border px-10">
      <h1 className="font-bold text-lg">Rp.{totalPrice.toLocaleString()}</h1>
      <img
        src={Assets.CustomerChatIcon}
        className="w-10 h-10 cursor-pointer"
        onClick={openChat}
      />

      <FilledButton
        onClick={startDestination}
        size="h-fit w-fit px-4 py-2"
        text="Check Out"
      />
    </div>
  );
};

export default BottomBar;
