import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await fetch(`${config.api}user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
        console.log(e);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout berhasil");
    navigate("/");
  };

  return { logout };
};

export default useLogout;
