import { useState } from "react";
import toast from "react-hot-toast";
import colors from "../../../res/colors";
import { Assets } from "../../../res/assets";

const ProfilePage = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    noTelpon: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      formData.noTelpon ||
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

    toast.success("Registrasi berhasil!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full">
        <form className="mt-0 space-y-6" onSubmit={handleSubmit}>
          <div className="w-full flex justify-center items-center">
            <div className="w-25 h-25 rounded-full overflow-hidden">
              <div className="w-full h-full relative">
                <div className="absolute h-full w-full">
                  <img src="images/image1.jpg" className="object-cover" />
                </div>
             
                <div
                  className="absolute h-full w-full p-8 cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <img
                    src={Assets.CameraIcon}
                    className="object-cover gray-filter opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
          <h2
            style={{ color: colors.hytam }}
            className="mt-2 text-center text-2xl font-semibold m-1"
          >
            Felicia
          </h2>
          <p style={{ color: colors.hytam }} className="text-center mb-5">
            felicia@gmail.com
          </p>
          <div className="rounded-md space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan alamat email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="noTelpon"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                No. Telpon
              </label>
              <input
                id="noTelpon"
                name="noTelpon"
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: 0811xxxxx"
                value={formData.noTelpon}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Buat password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
