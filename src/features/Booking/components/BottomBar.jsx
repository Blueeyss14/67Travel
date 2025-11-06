import { Assets } from "../../../res/assets";
import FilledButton from "../../../shared/buttons/FilledButton";
import { carouselImageData } from "../../home/data/carouselImageData";
import { carData } from "../data/carData";
import { locationData } from "../data/locationData";
import { useBookingStore } from "../state/useBookingStore";

const BottomBar = ({ isOpen, setIsOpen }) => {
  const { currentDay, days } = useBookingStore();

  const selectedCar = days[currentDay]?.selectedCar;
  const selectedLocation = days[currentDay]?.selectedLocation;
  const selectedDestination = days[currentDay]?.selectedDestination;
  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const parsePrice = (val) => {
    if (!val) return 0;
    return Number(String(val).replace(/[^\d]/g, "")) || 0;
  };

  const carPrice = parsePrice(
    carData.find((c) => c.uuid === selectedCar?.id)?.price
  );
  const locationPrice = parsePrice(
    carouselImageData.find((l) => l.id === selectedLocation?.id)?.price
  );
  const fromPrice = parsePrice(
    locationData.find((l) => l.id === selectedDestination?.from?.id)?.price
  );
  const toPrice = parsePrice(
    locationData.find((l) => l.id === selectedDestination?.to?.id)?.price
  );

  const totalPrice = carPrice + locationPrice + fromPrice + toPrice;

  return (
    <div className="bg-white w-full h-20 flex justify-end z-99999 items-center gap-5 shadow-[1px_1px_15px_rgba(0,0,0,0.1)] box-border px-10">
      <h1 className="font-bold text-lg">Rp.{totalPrice.toLocaleString()}</h1>
      <img
        src={Assets.CustomerChatIcon}
        className="w-10 h-10 cursor-pointer"
        onClick={openChat}
      />

      <FilledButton size="h-fit w-fit px-4 py-2" text="Check Out" />
    </div>
  );
};

export default BottomBar;
