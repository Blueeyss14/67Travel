// import { config } from "../../../config/config";

function formatHour(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function mapMessagesFromApi(rawData, { user, photo }) {
  if (!Array.isArray(rawData)) return [];

  const baseProfile =
    // photo
    //   ? URL.createObjectURL(photo)
    //   : user?.profile_photo
    //   ? `${config.asset}storage/${user.profile_photo}`
    //   : "/images/annonymous.png";
    photo
      ? URL.createObjectURL(photo)
      : user?.profile_photo
      ? user.profile_photo
      : "/images/annonymous.png";

  const userName = user?.nama ?? "You";

  return rawData
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .flatMap((item) => {
      const msgs = [];

      if (item.userMessage) {
        msgs.push({
          profile: baseProfile,
          message: item.userMessage,
          isUser: true,
          role: userName,
          timestamp: formatHour(item.timestamp),
        });
      }

      if (item.adminMessage) {
        msgs.push({
          profile: "/images/konatsuu.jpg",
          message: item.adminMessage,
          isUser: false,
          role: "Admin",
          timestamp: formatHour(item.timestamp),
        });
      }

      return msgs;
    });
}
