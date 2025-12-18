import colors from "../../../res/colors";
import useRegister from "../hook/useRegister";

const Regist = ({ onToggle }) => {
  const { formData, handleChange, handleProfileChange, handleSubmit } =
    useRegister();

  return (
    <div className="max-w-md w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="text-center mb-2">
          <h2
            style={{ color: colors.secondary }}
            className="text-2xl font-bold mb-1"
          >
            Daftar Akun
          </h2>
          <p className="text-xs text-white/70">Buat akun baru Anda</p>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="relative shrink-0">
            {formData.profile ? (
              <img
                src={URL.createObjectURL(formData.profile)}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <label
              htmlFor="profile"
              className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer shadow-sm hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
              </svg>
            </label>
            <input
              id="profile"
              name="profile"
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden"
            />
          </div>
          <div className="flex-col">
            <label className="block text-xs font-semibold mb-1 text-white/90">
              Foto Profil
            </label>
            <p className="text-xs text-white/70">
              Upload foto profil
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                Nama Lengkap
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60"
                placeholder="Nama lengkap"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60"
                placeholder="email@contoh.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              No. Telepon
            </label>
            <input
              name="noTelpon"
              type="tel"
              required
              className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60"
              placeholder="0811xxxxx"
              value={formData.noTelpon}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                Konfirmasi
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 px-4 text-sm font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white placeholder-white/60 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            Daftar Sekarang
          </button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs text-white/70">
            Sudah punya akun?{" "}
            <button
              onClick={onToggle}
              type="button"
              className="font-semibold text-white/80 hover:text-whitetransition-colors cursor-pointer"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Regist;