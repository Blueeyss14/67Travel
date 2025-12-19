import { useState, useEffect } from "react";
import { config } from "../../../config/config";
import toast from "react-hot-toast";

const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmark, setIsBookmark] = useState({});

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
          ratings: item.ratings || [],
          price: item.price,
          bookmark: item.bookmark,
          // bg: item.thumbnailUrl
          //   ? `${config.api.replace("/api/", "/storage/")}${item.thumbnailUrl}`
          //   : "images/image1.jpg",
          // imgs: (item.imageUrls || []).map(
          //   (img) => `${config.api.replace("/api/", "/storage/")}${img}`
          // ),
          bg: item.thumbnailUrl || "images/image1.jpg",
          imgs: item.imageUrls || [],
          facility: item.facilities || [],
          description: item.description || "",
        }));

        const initial = {};
        formatted.forEach((d, i) => {
          initial[i] = d.bookmark;
        });

        setIsBookmark(initial);
        setDestinations(formatted);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const toggleBookmark = async (index, destinationId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const newValue = !isBookmark[index];
    setIsBookmark({ ...isBookmark, [index]: newValue });

    try {
      const res = await fetch(
        `${config.api}destinations/${destinationId}/toggle-bookmark`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookmark: newValue }),
        }
      );

      if (!res.ok) throw new Error();
    } catch {
      setIsBookmark({ ...isBookmark, [index]: !newValue });
    }
  };

  return { destinations, loading, isBookmark, toggleBookmark };
};

export default useDestinations;
