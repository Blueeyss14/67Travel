import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useAccomodation = (currentDay = 0) => {
  const [accommodations, setAccommodations] = useState([]);
  const [days, setDays] = useState([
    { selectedAccommodation: { id: null, name: "Pilih Akomodasi" } },
  ]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await fetch(`${config.api}accommodations`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.content) {
          const formatted = data.content.map((v) => ({
            uuid: v.id,
            name: v.name,
            price: v.price,
            latitude: v.latitude,
            longitude: v.longitude,
            // img: v.thumbnail ? `${config.asset}storage/${v.thumbnail}` : "",
            img: v.thumbnail,
          }));
          setAccommodations(formatted);
        } else {
          toast.error("Gagal mengambil data akomodasi");
        }
      } catch (err) {
        toast.error(`Terjadi kesalahan saat fetch akomodasi: ${err}`);
      }
    };

    fetchAccommodations();
  }, [token]);

  const handleSelectAccommodation = (item) => {
    const newDays = [...days];
    newDays[currentDay] = { selectedAccommodation: item };
    setDays(newDays);
  };

  const selectedAccommodation =
    days[currentDay]?.selectedAccommodation || {
      id: null,
      name: "Pilih Akomodasi",
    };

  return {
    accommodations,
    selectedAccommodation,
    handleSelectAccommodation,
    days,
    setDays,
  };
};

export default useAccomodation;
