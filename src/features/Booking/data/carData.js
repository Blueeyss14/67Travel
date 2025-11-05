export const carData = [
  {
    name : "Nissan GTR"
  },
  {
    name : "Mazda"
  },
  {
    name : "Supra"
  },
];

export function mapCarChat(rawData) {
  return rawData.map((item) => ({
    name: item.name,
  }));
}
