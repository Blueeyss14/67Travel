export const ticketData = [
  {
    label: "Nama",
    value: "user",
  },
  {
    label: "Waktu",
    value: "790",
  },
  {
    label: "Kendaraan",
    value: "Mazda",
  },
  {
    label: "Lokasi",
    value: "Jakarta",
  },
  {
    label: "Nama Wisata",
    value: "Candi",
  },
  {
    label: "Harga",
    value: "790",
  },
  {
    label: "Pengunjung",
    value: 4,
  },
  {
    label: "Akomodasi",
    value: "Hotel",
  },
];

export function mapTicket(rawData) {
  return rawData.map((item) => ({
    nama: item.nama,
    value: item.value,
  }));
}
