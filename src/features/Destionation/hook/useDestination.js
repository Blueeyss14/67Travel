import { useState, useEffect } from "react";
import { config } from "../../../config/config";
import toast from "react-hot-toast";

const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token tidak ditemukan, silahkan login.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${config.api}destinations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error fetch destinations:", text);
          toast.error("Gagal mengambil data destinasi.");
          setLoading(false);
          return;
        }

        const data = await res.json();

        const formatted = data.content.map((item) => ({
          id: item.id,
          label: item.name,
          location: item.location,
          owner: item.owner,
          guest: item.maxOfGuest,
          rating: item.rating,
          price: item.price,
          bg: item.thumbnailUrl
            ? `${config.api.replace("/api/", "/storage/")}${item.thumbnailUrl}`
            : "images/image1.jpg",
          imgs: item.imageUrls.map(
            (img) => `${config.api.replace("/api/", "/storage/")}${img}`
          ),
          facility: item.facilities,
        }));

        setDestinations(formatted);
      } catch (err) {
        console.error("Error fetch destinations:", err);
        toast.error("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading };
};

export default useDestinations;
