import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Assets } from "../../../res/assets";
import FilledButton from "../../../shared/buttons/FilledButton";
import { carouselImageData } from "../../home/data/carouselImageData";
import { carData } from "../data/carData";
import { locationData } from "../data/locationData";
import { useBookingStore } from "../state/useBookingStore";
import toast, { Toaster } from "react-hot-toast";
import colors from "../../../res/colors";

const BottomBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { days } = useBookingStore();

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
      toast.error("Isi terlebih dahulu semua Day sebelum Check Out", {
        position: "top-center",
        style: {
          borderRadius: "12px",
          background: "#333",
          color: "#fff",
          padding: "12px 16px",
          fontSize: "14px",
        },
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to start destination?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Start",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#fff",
      confirmButtonColor: colors.primary,
      cancelButtonColor: "#999",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/on-the-way");
      }
    });
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
    <>
      <Toaster />
      <div className="bg-white w-full h-20 flex justify-between z-99999 items-center gap-5 shadow-[1px_1px_15px_rgba(0,0,0,0.1)] box-border pr-10">
        <div
          style={{ backgroundColor: colors.primary }}
          className="h-full justify-center flex flex-col items-start px-15 box-border [@media(max-width:1050px)]:px-5"
        >
          <p style={{ color: colors.secondary }}>Total:</p>
          <h1
            style={{ color: colors.secondary }}
            className="font-bold text-lg [@media(max-width:800px)]:text-[0.9rem]"
          >
            Rp.{totalPrice.toLocaleString()}
          </h1>
        </div>

        <div className="flex justify-center items-center gap-10 [@media(max-width:800px)]:gap-3">
          <img
            src={Assets.CustomerChatIcon}
            className="w-8 h-8 cursor-pointer blue-filter"
            onClick={openChat}
          />
          <FilledButton
            onClick={startDestination}
            textSize="[@media(max-width:1050px)]:text-[0.9rem]"
            size="h-fit w-fit px-4 py-2"
            text="Check Out"
          />
        </div>
      </div>
    </>
  );
};

export default BottomBar;
