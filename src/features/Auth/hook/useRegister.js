import { useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useRegister = () => {
  const [formData, setFormData] = useState({
    profile: null,
    name: "",
    email: "",
    noTelpon: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.profile ||
      !formData.name ||
      !formData.email ||
      !formData.noTelpon ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password tidak cocok!");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("profile_photo", formData.profile);
      payload.append("nama", formData.name);
      payload.append("email", formData.email);
      payload.append("noTelpon", formData.noTelpon);
      payload.append("password", formData.password);
      payload.append("confirmPassword", formData.confirmPassword);

      const res = await fetch(`${config.api}user/register`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal registrasi!");
        return;
      }

      if (data.success) {
        toast.success(data.message || "Registrasi berhasil!");
        setFormData({
          profile: null,
          name: "",
          email: "",
          noTelpon: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message || "Gagal registrasi!");
      }
    } catch (err) {
      toast.error(`Gagal registrasi! ${err}`);
    }
  };

  return {
    formData,
    handleChange,
    handleProfileChange,
    handleSubmit,
  };
};

export default useRegister;
