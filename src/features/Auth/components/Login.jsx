import colors from "../../../res/colors";
import useLogin from "../hook/useLogin";

const Login = ({ onToggle }) => {
  const { formData, handleChange, handleSubmit, loading } = useLogin();

  return (
    <div className="max-w-md w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="text-center mb-2">
          <h2
            style={{ color: colors.secondary }}
            className="text-2xl font-bold mb-1"
          >
            Selamat Datang
          </h2>
          <p className="text-xs text-white/70">Silahkan masuk ke akun Anda</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold mb-1 text-white/80">
              Alamat Email
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60 pl-10"
                placeholder="email@contoh.com"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 text-sm bg-white/10 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors placeholder-white/60 pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-3.5 w-3.5 text-blue-600 focus:ring-1 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-xs text-white/80 cursor-pointer"
            >
              Ingatkan saya
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
          disabled={loading}
            type="submit"
            className="w-full py-2.5 px-4 text-sm font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-[20px] border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-white placeholder-white/60 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? "Memproses..." : "Masuk ke akun"}
          </button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs text-white/70">
            Belum punya akun?{" "}
            <button
              onClick={onToggle}
              type="button"
              className="font-semibold transition-colors cursor-pointer text-white/80 hover:text-white"
            >
              Daftar di sini
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
