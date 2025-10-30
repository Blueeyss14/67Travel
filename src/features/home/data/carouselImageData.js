export const carouselImageData = [
  {
    bg: "/images/image1.jpg",
    label: "Hotel Telyu Sigma",
    owner: "Telyu Sigma",
    description:
      "Hotel Telyu Sigma adalah hotel modern yang terletak di kawasan strategis dekat Telkom University, Bandung. Hotel ini dirancang untuk memberikan kenyamanan maksimal bagi mahasiswa, dosen, dan wisatawan bisnis yang mencari tempat menginap dengan suasana tenang namun tetap dekat dengan pusat aktivitas kampus.",
  },
  {
    bg: "/images/image2.png",
    label: "Cafe Horizon",
    owner: "Horizon Group",
    description:
      "Cafe Horizon menghadirkan suasana hangat dengan pemandangan kota Bandung dari ketinggian. Tempat ini cocok untuk bersantai, mengerjakan tugas, atau sekadar menikmati kopi spesial racikan barista profesional.",
  },
  {
    bg: "/images/image3.jpg",
    label: "Telyu Park Residence",
    owner: "Sigma Property",
    description:
      "Telyu Park Residence adalah hunian eksklusif dengan konsep hijau yang mengutamakan kenyamanan dan privasi. Dikelilingi taman tropis dan akses mudah ke pusat pendidikan serta bisnis.",
  },
  {
    bg: "/images/image4.png",
    label: "Telkom University",
    owner: "Telkom Indonesia",
    description:
      "Telkom University merupakan universitas unggulan di Bandung yang berfokus pada bidang teknologi, bisnis, dan seni. Dikenal dengan kampusnya yang hijau dan modern, Telkom University menjadi pusat inovasi dan pendidikan kelas dunia.",
  },
];

export function mapImg(rawData) {
  return rawData.map((item) => ({
    bg: item.bg,
    label: item.label,
    owner: item.owner,
    description: item.description,
  }));
}
