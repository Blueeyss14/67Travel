export const carouselImageData = [
  { bg: '/images/image1.jpg'},
  { bg: '/images/image2.png'},
];

export function mapimg(rawData) {
  return rawData.map(item => ({
    bg: item.Icon,
  }));
}