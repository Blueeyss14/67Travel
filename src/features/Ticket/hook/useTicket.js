import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token tidak ditemukan, silahkan login.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${config.api}tickets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          toast.error("Gagal mengambil data tiket");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setTickets(data);
      } catch (err) {
        toast.error("Terjadi kesalahan saat mengambil data tiket");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading };
};

export default useTickets;