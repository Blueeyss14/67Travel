import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import colors from "../../res/colors";
import { useEffect } from "react";

const PrintTicketPage = () => {
  const location = useLocation();
  const { ticket, user } = location.state || {};

    useEffect(() => {
    if (ticket) {
      window.print();
    }
  }, [ticket]);


  if (!ticket) {
    return <p>Data tiket tidak ditemukan</p>;
  }

  return (
    <div className="p-10 bg-white text-black">
      <div
        style={{
          backgroundColor: colors.primary + "10",
          borderColor: colors.primary + "30",
        }}
        className="w-full my-6 p-4 rounded-xl border"
      >
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <div
              style={{ backgroundColor: colors.primary }}
              className="w-3 h-3 rounded-full"
            ></div>
            <span>
              Tiket ini berlaku hingga:{" "}
              {dayjs(ticket.expired_at).format("DD MMMM YYYY HH:mm")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: colors.primary }}
              className="w-3 h-3 rounded-full"
            ></div>
            <span>Harap simpan tiket ini untuk penukaran</span>
          </div>
        </div>
      </div>

      <div className="w-full border-2 border-blue-100 bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[2.2rem] mb-3 text-end w-full tracking-tight"
        >
          {ticket.ticket_code}
        </h1>
        <p style={{ color: colors.hytam }} className="text-right w-full m-0">
          {user?.nama}
        </p>

        <div className="w-full mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%] mx-auto">
            {[
              { label: "Destinasi", value: ticket.destination_name },
              { label: "Lokasi", value: ticket.location },
              { label: "Kendaraan", value: ticket.vehicle_name },
              { label: "Akomodasi", value: ticket.accommodation_name },
              { label: "Jumlah Tamu", value: `${ticket.guest_count} orang` },
              {
                label: "Waktu",
                value: dayjs(ticket.created_at).format("DD MMMM YYYY"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-start p-4 rounded-xl border ${
                  index % 2 === 0
                    ? "border-blue-100 bg-white"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="min-w-[150px]">
                  <span className="font-semibold text-gray-700">
                    {item.label}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">
                    : {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-8 overflow-hidden rounded-xl border border-blue-100 shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr
                style={{ backgroundColor: colors.primary }}
                className="text-white"
              >
                <th className="p-4 text-left font-semibold text-lg">Rincian</th>
                <th className="p-4 text-left font-semibold text-lg">Detail</th>
                <th className="p-4 text-left font-semibold text-lg">Harga</th>
              </tr>
            </thead>
            <tbody>
              {ticket.price_breakdown.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-4 font-medium text-gray-800">{row.name}</td>
                  <td className="p-4 text-gray-600">{row.detail_price}</td>
                  <td className="p-4 font-semibold text-gray-800">
                    Rp.{row.total.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr
                style={{ backgroundColor: colors.primary + "10" }}
                className="border-t-2 border-blue-200"
              >
                <td colSpan="2" className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">Total</span>
                    <span className="text-sm text-gray-500">(Termasuk PPN)</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span
                      style={{ color: colors.primary }}
                      className="font-bold text-xl"
                    >
                      Rp.{ticket.total_price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">Sudah termasuk pajak</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintTicketPage;
