import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Leaf, Recycle, Award, Eye, EyeOff } from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

export default function Signup() {
  const navigate = useNavigate();

  const { signup } = useAuth();
  const { addNotification } = useNotifications();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function update(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords don't match");
    }

    try {
      setLoading(true);

      await signup(form.email, form.password, form.name);

      addNotification("Your account was created. Check your email to confirm.");
      toast.success("New Notification!");

      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <div className="hidden lg:flex w-1/2 border-r border-white/10">
        <div className="p-12">
          <Leaf className="text-emerald-400" />

          <h1 className="text-5xl font-bold mt-10">Join The Movement</h1>

          <div className="mt-10 space-y-4">
            <div className="bg-white/5 rounded-2xl p-4 flex gap-4">
              <Recycle />

              <div>
                <h3>Scan & Recycle</h3>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 flex gap-4">
              <Award />

              <div>
                <h3>Level Up</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md"
        >
          <h2 className="text-4xl font-bold mb-8">Create Account</h2>

          <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 mb-6 flex justify-center gap-3">
            <FcGoogle />
            Continue with Google
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Full Name"
              className="w-full p-4 rounded-xl bg-white/5"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              placeholder="Email"
              className="w-full p-4 rounded-xl bg-white/5"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={update}
                placeholder="Password"
                className="w-full p-4 rounded-xl bg-white/5 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={update}
                placeholder="Confirm Password"
                className="w-full p-4 rounded-xl bg-white/5 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 rounded-xl bg-emerald-500 text-black font-semibold flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center">
            Already have account?
            <Link to="/login" className="text-emerald-400 ml-2">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
