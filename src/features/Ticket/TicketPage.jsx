import colors from "../../res/colors";
import { ticketData } from "./data/ticket_data";
import FilledButton from "../../shared/buttons/FilledButton";

const TicketPage = () => {
  return (
    <div className="flex flex-col justify-center items-center box-border p-5 min-h-screen bg-gray-50">
      <div
        style={{
          backgroundColor: colors.primary + "10",
          borderColor: colors.primary + "30",
        }}
        className="w-[60%] [@media(max-width:1100px)]:w-full my-6 p-4 rounded-xl border"
      >
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <div
              style={{ backgroundColor: colors.primary }}
              className="w-3 h-3 rounded-full"
            ></div>
            <span>Tiket ini berlaku hingga: 31 Desember 2025</span>
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

      <div className="mb-10 w-[60%] [@media(max-width:1100px)]:w-full h-full border-2 border-blue-100 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-start items-center box-border p-10 relative overflow-hidden">
        <div
          style={{ backgroundColor: colors.primary }}
          className="absolute top-0 left-0 w-full h-2"
        ></div>

        <div
          style={{ backgroundColor: colors.primary + "15" }}
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
        ></div>
        <div
          style={{ backgroundColor: colors.primary + "10" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full"
        ></div>

        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[2.2rem] mb-6 text-end w-full tracking-tight"
        >
          Tiket Nama Lokasi
        </h1>

        <div
          style={{ backgroundColor: colors.primary + "50" }}
          className="w-full h-px rounded-full opacity-70"
        ></div>

        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[2rem] mb-6 w-full mt-10 text-left flex items-center gap-3"
        >
          <span>67Travel</span>
          <span
            style={{
              backgroundColor: colors.primary + "20",
              color: colors.primary,
            }}
            className="text-sm font-normal px-3 py-1 rounded-full"
          >
            Official Partner
          </span>
        </h1>

        {/* DIVIDER */}
        <div
          style={{ backgroundColor: colors.primary + "20" }}
          className="w-full h-px rounded-full"
        ></div>

        <div className="w-full mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%] mx-auto">
            {ticketData.map((ticket, index) => (
              <div
                key={index}
                className={`flex items-start p-4 rounded-xl border ${
                  index % 2 === 0
                    ? "border-blue-100 bg-white hover:bg-blue-50"
                    : "border-gray-100 bg-white hover:bg-gray-50"
                } hover:shadow-md transition-all duration-200`}
              >
                <div className="min-w-[150px]">
                  <span className="font-semibold text-gray-700">
                    {ticket.label}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">
                    : {ticket.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[1.8rem] mt-14 mb-6 w-full flex items-center"
        >
          <span>Detail</span>
          <span
            style={{
              backgroundColor: colors.primary,
              color: "white",
            }}
            className="ml-3 text-sm font-normal px-3 py-1 rounded-full"
          >
            Rincian Pembayaran
          </span>
        </h1>

        {/* DIVIDER */}
        <div
          style={{ backgroundColor: colors.primary + "50" }}
          className="w-full h-0.5 rounded-full"
        ></div>

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
              {[
                {
                  item: "Ticket Candi",
                  detail: "4 x Rp.800.000",
                  price: "Rp.3.200.000",
                },
                { item: "Kendaraan", detail: "-", price: "Rp.200.000" },
                { item: "Akomodasi", detail: "-", price: "Rp.200.000" },
              ].map((row, index) => (
                <tr
                  key={index}
                  className={`hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4 font-medium text-gray-800">{row.item}</td>
                  <td className="p-4 text-gray-600">{row.detail}</td>
                  <td className="p-4 font-semibold text-gray-800">
                    {row.price}
                  </td>
                </tr>
              ))}
              <tr
                style={{ backgroundColor: colors.primary + "10" }}
                className="border-t-2 border-blue-200"
              >
                <td colSpan="2" className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">
                      Total
                    </span>
                    <span className="text-sm text-gray-500">
                      (Termasuk PPN)
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span
                      style={{ color: colors.primary }}
                      className="font-bold text-xl"
                    >
                      Rp.3.600.000
                    </span>
                    <span className="text-sm text-gray-500">
                      Sudah termasuk pajak
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-[60%] [@media(max-width:1100px)]:w-full mt-6">
        <FilledButton
          text="Cetak Tiket"
          width="w-full"
          style={{
            backgroundColor: colors.primary,
            color: "white",
          }}
          className="hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
        />
      </div>
    </div>
  );
};

export default TicketPage;
