export const ratingData = [
  {
    id: 1,
    name: "Felicia",
    rating: "5",
    image: "images/image1.jpg",
    description:
      "Gilak bagus banget coyyyy fasilitas lengkap, gampang diakses kacaw keren",
  },
  {
    id: 2,
    name: "Gena",
    rating: "4",
    image: "images/image1.jpg",
    description: "Tempat nyaman, akses mudah, tapi parkir agak susah.",
  },
  {
    id: 3,
    name: "Thalia Anggreny",
    rating: "5",
    image: "images/image1.jpg",
    description: "Suasana oke, staf ramah, pasti balik lagi.",
  },
  {
    id: 4,
    name: "Dafi",
    rating: "4",
    image: "images/image1.jpg",
    description: "Lokasi strategis, fasilitas lengkap tapi agak ramai.",
  },
  {
    id: 5,
    name: "Michelle",
    rating: "5",
    image: "images/image1.jpg",
    description: "Pengalaman sangat menyenangkan, worth it banget!",
  },
  {
    id: 6,
    name: "Dimas",
    rating: "4",
    image: "images/image1.jpg",
    description: "Keren, tapi bisa lebih baik soal kebersihan.",
  },
  {
    id: 7,
    name: "Arik",
    rating: "5",
    image: "images/image1.jpg",
    description: "Fasilitas top, akses gampang, recommended pokoknya!",
  },
];

export function mapRating(rawData) {
  return rawData.map((item) => ({
    id: item.id,
    name: item.name,
    rating: item.rating,
    image: item.image,
    description: item.description,
  }));
}
