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

export function mapCar(rawData) {
  return rawData.map((item) => ({
    uuid: item.uiid,
    name: item.name,
    img: item.img,
    price: item.price,
    maxPassenger: item.maxPassenger,
  }));
}
