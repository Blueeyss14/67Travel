import Swal from "sweetalert2";
import { Assets } from "../../../res/assets";
import toast, { Toaster } from "react-hot-toast";
import colors from "../../../res/colors";
import PrimaryButton from "../../../shared/buttons/PrimaryButton";
import { config } from "../../../config/config";

const BottomBar = ({ 
  isOpen, 
  setIsOpen,
  destinationId,
  vehicleId,
  accommodationId,
  expiredAt,
  guestCount
}) => {
  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleBayar = async () => {
    if (!destinationId) {
      toast.error("Destinasi belum dipilih!");
      return;
    }
    
    if (!vehicleId) {
      toast.error("Kendaraan belum dipilih!");
      return;
    }
    
    if (!accommodationId) {
      toast.error("Akomodasi belum dipilih!");
      return;
    }
    
    if (!expiredAt) {
      toast.error("Tanggal belum dipilih!");
      return;
    }
    
    if (!guestCount || guestCount < 1) {
      toast.error("Jumlah pengunjung belum diisi!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token tidak ditemukan, silahkan login.");
        return;
      }

      const payload = {
        destination_id: destinationId,
        vehicle_id: vehicleId,
        accommodation_id: accommodationId,
        expired_at: expiredAt,
        guest_count: guestCount
      };

      const res = await fetch(`${config.api}tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal membuat tiket");
        return;
      }

      const data = await res.json();

      Swal.fire({
        icon: "success",
        title: "Tiket Berhasil Dibuat!",
        html: `
          <p>Kode Tiket: <strong>${data.ticket_code || ""}</strong></p>
          <p>Total: <strong>Rp ${data.total_price?.toLocaleString() || 0}</strong></p>
        `,
        confirmButtonColor: colors.primary,
      });

    } catch (err) {
      toast.error("Terjadi kesalahan saat membuat tiket");
      console.error(err);
    }
  };

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
            Rp.0
          </h1>
        </div>

        <div className="flex justify-center items-center gap-10 [@media(max-width:800px)]:gap-3">
          <img
            src={Assets.CustomerChatIcon}
            className="w-8 h-8 cursor-pointer blue-filter"
            onClick={openChat}
          />

          <PrimaryButton type="button" text="Bayar" onClick={handleBayar} />
        </div>
      </div>
    </>
  );
};

export default BottomBar;