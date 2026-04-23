import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] p-6">

      {/* 🔥 PROJECT NAME TOP CENTER */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
        TaskFlow 🚀
      </h1>
      <p className="text-blue-200 mb-6 text-sm">
        Organize your tasks like a pro
      </p>

      <div className="w-full h-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 items-center justify-center relative">
          <div className="absolute w-40 h-60 bg-blue-400/30 rounded-full top-10 left-10 blur-2xl"></div>
          <div className="absolute w-40 h-60 bg-purple-400/30 rounded-full bottom-10 right-10 blur-2xl"></div>

          <div className="text-center text-white z-10 px-6">
            <h1 className="text-4xl font-bold mb-3">Welcome Back 👋</h1>
            <p className="opacity-80">
              Manage your tasks efficiently and stay productive every day.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            Sign In 🔐
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password with Eye */}
          <div className="mb-6 relative">
            <label className="text-sm">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full mt-1 p-3 pr-10 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* 👁️ Eye Icon */}
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-white/70"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-200 shadow-lg"
          >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-base mt-5 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-300 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;