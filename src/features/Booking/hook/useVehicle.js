import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useVehicle = (currentDay = 0, visitorCount = 1) => {
  const [vehicles, setVehicles] = useState([]);
  const [days, setDays] = useState([
    {
      selectedCar: { id: null, name: "Pilih Kendaraan" },
    },
  ]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`${config.api}vehicles`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.content) {
          const formatted = data.content.map((v) => ({
            uuid: v.id,
            name: v.name,
            price: v.price,
            maxPassenger: v.maxPassenger,
            // img: v.thumbnailUrl
            //   ? `${config.asset}storage/${v.thumbnailUrl}`
            //   : "",
            img: v.thumbnailUrl
          }));
          setVehicles(formatted);
        } else {
          toast.error("Gagal mengambil data kendaraan");
        }
      } catch (err) {
        toast.error(`Terjadi kesalahan saat fetch kendaraan ${err}`);
      }
    };

    fetchVehicles();
  }, [token]);

  const handleSelectCar = (item) => {
    if (visitorCount > item.maxPassenger) {
      toast.error("Jumlah penumpang melebihi maksimal kendaraan!", {
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
    const newDays = [...days];
    newDays[currentDay] = { selectedCar: item };
    setDays(newDays);
  };

  const selectedCar = days[currentDay]?.selectedCar || {
    id: null,
    name: "Pilih Kendaraan",
  };

  return {
    vehicles,
    selectedCar,
    handleSelectCar,
    days,
    setDays,
  };
};

export default useVehicle;
