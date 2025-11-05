export const carouselImageData = [
  {
    bg: "/images/image1.jpg",
    location: "Jakarta",
    label: "Hotel Telyu Sigma",
    owner: "Telyu Sigma",
    checkIn: "29/10/2025",
    checkOut: "16/11/2025",
    guest: "4",
    rating: "4.5",
    price: "800.000",
    facility: ["Kolam Berenang", "Restaurant", "Ac"],
    imgs: ["images/image1.jpg","images/image2.png", "images/image3.jpg","images/image4.png"],
    description:
      "Hotel Telyu Sigma adalah hotel modern yang terletak di kawasan strategis dekat Telkom University, Bandung. Hotel ini dirancang untuk memberikan kenyamanan maksimal bagi mahasiswa, dosen, dan wisatawan bisnis yang mencari tempat menginap dengan suasana tenang namun tetap dekat dengan pusat aktivitas kampus.",
  },
  {
    bg: "/images/image2.png",
    location: "Jakarta",
    label: "Cafe Horizon",
    owner: "Horizon Group",
    checkIn: "29/10/2025",
    checkOut: "16/11/2025",
    guest: "4",
    rating: "4.5",
    price: "800.000",
    facility: ["Kolam Berenang", "Restaurant", "Ac"],
    imgs: ["images/image1.jpg","images/image2.png", "images/image3.jpg","images/image4.png"],
    description:
      "Cafe Horizon menghadirkan suasana hangat dengan pemandangan kota Bandung dari ketinggian. Tempat ini cocok untuk bersantai, mengerjakan tugas, atau sekadar menikmati kopi spesial racikan barista profesional.",
  },
  {
    bg: "/images/image3.jpg",
    location: "Bandung",
    label: "Telyu Park Residence",
    owner: "Sigma Property",
    checkIn: "30/10/2025",
    checkOut: "16/11/2025",
    guest: "4",
    rating: "4.5",
    price: "800.000",
    facility: ["Kolam Berenang", "Restaurant", "Ac"],
    imgs: ["images/image1.jpg","images/image2.png", "images/image3.jpg","images/image4.png"],
    description:
      "Telyu Park Residence adalah hunian eksklusif dengan konsep hijau yang mengutamakan kenyamanan dan privasi. Dikelilingi taman tropis dan akses mudah ke pusat pendidikan serta bisnis.",
  },
  {
    bg: "/images/image4.png",
    location: "Bandung",
    label: "Telkom University",
    owner: "Telkom Indonesia",
    checkIn: "29/10/2025",
    checkOut: "16/11/2025",
    guest: "4",
    rating: "4.5",
    price: "800.000",
    facility: ["Kolam Berenang", "Restaurant", "Ac"],
    imgs: ["images/image1.jpg","images/image2.png", "images/image3.jpg","images/image4.png"],
    description:
      "Telkom University merupakan universitas unggulan di Bandung yang berfokus pada bidang teknologi, bisnis, dan seni. Dikenal dengan kampusnya yang hijau dan modern, Telkom University menjadi pusat inovasi dan pendidikan kelas dunia.",
  },
];

export function mapImg(rawData) {
  return rawData.map((item) => ({
    bg: item.bg,
    label: item.label,
    owner: item.owner,
    checkIn: item.checkIn,
    checkOuteckIn: item.checkOut,
    guest: item.guest,
    description: item.description,
  }));
}
