import colors from "../../../res/colors";
import { Assets } from "../../../res/assets";
import { config } from "../../../config/config";
import useUserProfile from "../hook/useUserProfile";

const ProfilePage = () => {
  const {
    user,
    formData,
    photo,
    setPhoto,
    handleChange,
    handleSubmit,
  } = useUserProfile();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : user?.profile_photo
                      ? `${config.asset}storage/${user.profile_photo}`
                      : "images/annonymous.png"
                  }
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  alt="Profile"
                />
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-opacity-30 rounded-full transition-all duration-300 cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="bg-white p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <img
                    src={Assets.CameraIcon}
                    className="w-6 h-6"
                    alt="Edit photo"
                  />
                </div>
              </div>

              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to edit
              </div>
            </div>

            <h2
              style={{ color: colors.hytam }}
              className="mt-6 text-center text-2xl font-bold"
            >
              {user?.nama}
            </h2>
            <p
              style={{ color: colors.hytam }}
              className="text-center text-sm opacity-75"
            >
              {user?.email}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50"
                placeholder="Masukkan alamat email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="noTelpon"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                No. Telpon
              </label>
              <input
                id="noTelpon"
                name="noTelpon"
                type="tel"
                required
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50"
                placeholder="Ex: 0811xxxxx"
                value={formData.noTelpon}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50"
                placeholder="Buat password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
    </div>
  );
};

export default ProfilePage;
