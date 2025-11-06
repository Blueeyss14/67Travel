export const locationData = [
  { id: 1, name: "Wisata 1", lat: -6.914744, long: 107.60981, price: 100000 },
  { id: 2, name: "Wisata 2", lat: -6.9275, long: 107.618, price: 100000 },
  { id: 3, name: "Wisata 3", lat: -6.9032, long: 107.6155, price: 100000 },
];

export function mapLocation(rawData) {
  return rawData.map((item) => ({
    id: item.id,
    name: item.name,
    lat: item.lat,
    long: item.long,
    price: item.price
  }));
}
