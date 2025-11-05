export const chatData = [
  {
    profile: "/images/image1.jpg",
    message: "Halo, saya butuh bantuan.",
    isUser: true,
    role : "Telyu Sigma"
  },
  {
    profile: "/images/image1.jpg",
    message: "Halo! Ada yang bisa kami bantu?",
    isUser: false,
    role : "Admin"
  },
  {
    profile: "/images/image1.jpg",
    message: "Saya ingin tahu status pesanan saya.",
    isUser: true,
    role : "Telyu Sigma"
  },
];

export function mapChat(rawData) {
  return rawData.map((item) => ({
    profile: item.profile,
    message: item.message,
    isUser: item.isUser
  }));
}
