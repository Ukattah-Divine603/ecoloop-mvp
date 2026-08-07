import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Leaf, Recycle, Award, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { addNotification } = useNotifications();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, password);

      addNotification("You've successfully logged in. Welcome back!");
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
      <div className="hidden lg:flex w-1/2 relative overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-green-500/10" />

        <div className="relative z-10 flex flex-col justify-between p-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <Leaf className="text-emerald-400" />
              </div>

              <h1 className="text-3xl font-bold">EcoLoop</h1>
            </div>

            <h2 className="mt-12 text-5xl font-bold">
              Turn Waste Into Impact.
            </h2>

            <p className="mt-6 text-gray-400">
              Scan waste, earn Eco Points and unlock rewards.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4"
            >
              <Recycle className="text-emerald-400" />

              <div>
                <h3>AI Waste Detection</h3>

                <p className="text-sm text-gray-400">
                  Identify waste instantly
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4"
            >
              <Award className="text-yellow-400" />

              <div>
                <h3>Earn Rewards</h3>

                <p className="text-sm text-gray-400">Gain points and badges</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h2 className="text-4xl font-bold mb-8">Welcome Back</h2>

          <button
            type="button"
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center gap-3"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 rounded-xl px-4 py-3"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 rounded-xl px-4 py-3 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have account?
            <Link to="/signup" className="text-emerald-400 ml-2">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
