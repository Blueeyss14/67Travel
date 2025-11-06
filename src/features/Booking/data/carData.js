export const carData = [
  {
    uuid: "dsfgdfg",
    img: "images/skyline.png",
    name: "Nissan GTR",
    price: 200000,
    maxPassenger: 4,
  },
  {
    uuid: "ddfgd",
    img: "images/skyline.png",
    name: "Mazda",
    price: 200000,
    maxPassenger: 4,
  },
  {
    uuid: "dsfgdswg",
    img: "images/skyline.png",
    name: "Supra",
    price: 200000,
    maxPassenger: 4,
  },
  {
    uuid: "webvw",
    img: "images/skyline.png",
    name: "Supra",
    price: 200000,
    maxPassenger: 4,
  },
];

export function mapCarChat(rawData) {
  return rawData.map((item) => ({
    name: item.name,
  }));
}
