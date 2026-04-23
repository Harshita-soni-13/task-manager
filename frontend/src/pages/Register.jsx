import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Enter valid email";
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

      if (!passwordRegex.test(value)) {
        error = "Min 6 chars, include letter, number & special char";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    const errorMsg = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  const handleRegister = async () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await API.post("/auth/register", form);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] p-6">

      {/* 🔥 PROJECT NAME */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
        TaskFlow 🚀
      </h1>
      <p className="text-blue-200 mb-6 text-sm">
        Create your account & start managing tasks
      </p>

      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">

        {/* LEFT FORM */}
        <div className="w-full md:w-1/2 p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            Create Account 🚀
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm">Full Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm">Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password + Eye */}
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

            {errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 py-3 rounded-xl font-semibold hover:bg-blue-600 transition shadow-lg"
          >
            Register
          </button>

          <p className="text-base mt-5 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-300 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT DESIGN */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 items-center justify-center relative">
          <div className="absolute w-40 h-40 bg-blue-400/30 rounded-full top-10 left-10 blur-2xl"></div>
          <div className="absolute w-40 h-40 bg-purple-400/30 rounded-full bottom-10 right-10 blur-2xl"></div>

          <div className="text-center text-white z-10 px-6">
            <h2 className="text-4xl font-bold mb-3">Join TaskFlow </h2>
            <p className="opacity-80">
              Start organizing your tasks like a pro.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;