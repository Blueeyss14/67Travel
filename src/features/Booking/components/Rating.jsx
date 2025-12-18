import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Assets } from "../../../res/assets";
import colors from "../../../res/colors";
import FilledButton from "../../../shared/buttons/FilledButton";
import useUserProfile from "../../Profile/hook/useUserProfile";
import { config } from "../../../config/config";

const Rating = ({ destinationId }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const descRef = useRef(null);

  const { user, photo } = useUserProfile();

  const handleSubmitRating = async () => {
    if (selected === 0) {
      toast.error("beri bintang");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Harus login");
      return;
    }

    try {
      const res = await fetch(
        `${config.api}destinations/${destinationId}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rate: selected,
            description: descRef.current.value,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal kirim rating");
        return;
      }

      toast.success("Rating berhasil dikirim");
      setSelected(0);
      descRef.current.value = "";
    } catch (err) {
      toast.error(`Server error ${err}`);
    }
  };

  return (
    <div className="w-full border border-black/10 p-5 rounded-2xl flex flex-col gap-3 mt-10">
      <div className="flex justify-start items-center gap-3">
        <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
          <img
            src={
              photo
                ? URL.createObjectURL(photo)
                : user?.profile_photo
                ? `${config.asset}storage/${user.profile_photo}`
                : "images/annonymous.png"
            }
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-bold" style={{ color: colors.hytam }}>
          {user?.nama}
        </h1>
      </div>

      <textarea
        ref={descRef}
        placeholder="Berikan rating!"
        className="h-30 w-full resize-none border-none outline-none bg-gray-50 rounded-2xl p-3"
        style={{ color: colors.hytam }}
      />

      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={
                star <= (hovered || selected)
                  ? Assets.StarFilledIcon
                  : Assets.StarOutlinedIcon
              }
              className="w-6 h-6 cursor-pointer yellow-filter"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(star)}
            />
          ))}
        </div>

        <FilledButton text="Berikan Rating" onClick={handleSubmitRating} />
      </div>
    </div>
  );
};

export default Rating;
