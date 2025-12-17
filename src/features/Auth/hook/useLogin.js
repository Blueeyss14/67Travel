import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email dan password harus diisi!");
      return;
    }

    try {
      const res = await fetch(`${config.api}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login gagal!");
        return;
      }

      if (data.success) {
        toast.success(data.message || "Login berhasil!");
        navigate("/home");
      } else {
        toast.error(data.message || "Login gagal!");
      }
    } catch (err) {
      toast.error(`Login gagal! ${err}`);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
