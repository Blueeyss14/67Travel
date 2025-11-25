import colors from "../../res/colors";
import { ticketData } from "./data/ticket_data";
import FilledButton from "../../shared/buttons/FilledButton";

const TicketPage = () => {
  return (
    <div className="flex justify-center items-center box-border p-5">
      <div
        className="w-[60%] [@media(max-width:1100px)]:w-full h-full border border-black/15 rounded-[10px] flex flex-col justify-start items-center box-border p-10
      "
      >
        <h1
          style={{ color: colors.primary }}
          className="font-semibold text-[2rem] mb-4 text-end w-full"
        >
          Tiket Nama Lokasi
        </h1>
        {/* DIVIDER */}
        <div
          style={{ backgroundColor: colors.primary }}
          className="w-full h-[1.5px] rounded-full"
        ></div>

        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[2rem] mb-3 w-full mt-10"
        >
          67Travel
        </h1>

        {/* DIVIDER */}
        {/* <div
          style={{ backgroundColor: colors.primary }}
          className="w-full h-0.5 rounded-full"
        ></div> */}

        <div className="w-full mt-10">
          <table border="1" className="w-[50%]">
            {ticketData.map((ticket) => (
              <tr>
                <td className="p-1">{ticket.label}</td>
                <td>: {ticket.value}</td>
              </tr>
            ))}
          </table>
        </div>
        <h1
          style={{ color: colors.primary }}
          className="font-semibold text-[2rem] mt-10 mb-4 w-full"
        >
          Detail
        </h1>
        {/* DIVIDER */}
        <div
          style={{ backgroundColor: colors.primary }}
          className="w-full h-0.5 rounded-full"
        ></div>

        <table 
        id="table-detail"
        class="border-collapse border w-full mt-10 mb-10">
          <tr>
            <th>Rincian</th>
            <th>Detail</th>
            <th>Harga</th>
          </tr>
          <tr>
            <td>Ticket Candi</td>
            <td>4 x Rp.800.000</td>
            <td>Rp.3.200.000</td>
          </tr>
          <tr>
            <td>Kendaraan</td>
            <td>-</td>
            <td>Rp.200.000</td>
          </tr>
          <tr>
            <td>Akomodasi</td>
            <td>-</td>
            <td>Rp.200.000</td>
          </tr>
          <tr>
            <th className="text-start" colSpan="2">Total</th>
            <th className="text-start">Rp.3.600.000</th>
          </tr>
        </table>
        <FilledButton
        text="Cetak"
        width='w-full'
        />
      </div>
    </div>
  );
};

export default TicketPage;
