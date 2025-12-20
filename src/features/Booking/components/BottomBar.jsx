import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Assets } from "../../../res/assets";
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
  guestCount, 
  total
}) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const openChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleBayarClick = () => {
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

    setShowConfirmModal(true);
  };

  const handleConfirmBayar = async () => {
    setIsProcessing(true);
    
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
      
      localStorage.setItem("latestTicket", JSON.stringify(data));

      const existingNotifications = localStorage.getItem(`notifications_${token}`);
      const notifications = existingNotifications ? JSON.parse(existingNotifications) : [];
      
      const newNotifications = [
        {
          id: Date.now() + Math.random(),
          title: "Pembayaran Berhasil",
          message: `Pembayaran tiket ${data.ticket_code} sebesar Rp ${total.toLocaleString("id-ID")} telah berhasil diproses`,
          time: "Baru saja",
          type: "payment",
          read: false,
        },
        {
          id: Date.now() + Math.random() + 1,
          title: "Tiket Berhasil Dibuat",
          message: `Tiket ${data.ticket_code} untuk ${data.destination_name} berhasil dibuat`,
          time: "Baru saja",
          type: "booking",
          read: false,
        },
        ...notifications
      ];

      localStorage.setItem(`notifications_${token}`, JSON.stringify(newNotifications));
      
      navigate("/success-payment");

    } catch (err) {
      toast.error("Terjadi kesalahan saat membuat tiket");
      console.error(err);
    } finally {
      setIsProcessing(false);
      setShowConfirmModal(false);
    }
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Toaster />
      
      {showConfirmModal && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-800/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Konfirmasi Pembayaran</h3>
                    <p className="text-gray-500 text-sm mt-1">Apakah anda yakin ingin membeli tiket ini?</p>
                  </div>
                </div>
                <button
                  onClick={closeConfirmModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isProcessing}
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="my-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">
                  Pastikan semua data sudah benar sebelum melakukan pembayaran.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeConfirmModal}
                  disabled={isProcessing}
                  className="flex-1 py-3 border border-gray-300 cursor-pointer text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                style={{backgroundColor: colors.primary}}
                  onClick={handleConfirmBayar}
                  disabled={isProcessing}
                  className="flex-1 py-3 text-white font-medium cursor-pointer rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Memproses...
                    </span>
                  ) : "Bayar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            Rp.{total.toLocaleString("id-ID")}
          </h1>
        </div>

        <div className="flex justify-center items-center gap-10 [@media(max-width:800px)]:gap-3">
          <img
            src={Assets.CustomerChatIcon}
            className="w-8 h-8 cursor-pointer blue-filter"
            onClick={openChat}
          />

          <PrimaryButton 
            type="button" 
            text="Bayar" 
            onClick={handleBayarClick} 
            disabled={isProcessing}
          />
        </div>
      </div>
    </>
  );
};

export default BottomBar;