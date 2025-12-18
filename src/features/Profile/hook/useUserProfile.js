import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../../config/config";

const useUserProfile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    noTelpon: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      const res = await fetch(`${config.api}user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.data);
        setFormData((prev) => ({
          ...prev,
          name: data.data.nama || "",
          email: data.data.email || "",
          noTelpon: data.data.noTelpon || "",
        }));
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.noTelpon) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Password tidak cocok!");
      return;
    }

    const fd = new FormData();
    fd.append("_method", "PUT");
    fd.append("nama", formData.name);
    fd.append("email", formData.email);
    fd.append("noTelpon", formData.noTelpon);

    if (formData.password) {
      fd.append("password", formData.password);
      fd.append("confirmPassword", formData.confirmPassword);
    }

    if (photo) {
      fd.append("profile_photo", photo);
    }

    const res = await fetch(`${config.api}user/update/${user.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Update gagal!");
      return;
    }

    toast.success("Profile berhasil diupdate!");
  };

  return {
    user,
    formData,
    photo,
    setPhoto,
    handleChange,
    handleSubmit,
  };
};

export default useUserProfile;
