import { useEffect } from "react";

const THRESHOLDS = [
  { sec: 120, label: "2 menit" },
  { sec: 60, label: "1 menit" },
  { sec: 30, label: "30 detik" },
  { sec: 0, label: "habis" },
];

const useTicketExpiryNotifier = (tickets, setNotifications) => {
  useEffect(() => {
    if (!tickets || tickets.length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const storageKey = `ticket_notif_${token}`;

    const interval = setInterval(() => {
      const fired = JSON.parse(localStorage.getItem(storageKey) || "{}");

      tickets.forEach((ticket) => {
        const now = new Date();
        const expiredStr = ticket.expired_at.replace('Z', '');
        const expiredAt = new Date(expiredStr);
        const remainingSec = Math.floor((expiredAt - now) / 1000);

        THRESHOLDS.forEach(({ sec, label }) => {
          const key = `${ticket.ticket_code}_${sec}`;

          if (remainingSec === sec && !fired[key]) {
            fired[key] = true;
            localStorage.setItem(storageKey, JSON.stringify(fired));

            setNotifications((prev) => [
              {
                id: Date.now() + Math.random(),
                title: sec === 0 ? "Tiket Kadaluarsa" : "Tiket Akan Berakhir",
                message:
                  sec === 0
                    ? `Tiket ${ticket.ticket_code} untuk ${ticket.destination_name} telah habis masa berlakunya`
                    : `Tiket ${ticket.ticket_code} untuk ${ticket.destination_name} akan berakhir ${label} lagi`,
                time: "Baru saja",
                type: "reminder",
                read: false,
              },
              ...prev,
            ]);
          }
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tickets, setNotifications]);
};

export default useTicketExpiryNotifier;