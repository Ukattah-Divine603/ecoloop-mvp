import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { usePoints } from "../context/PointsContext";
import { useHistory } from "../context/HistoryContext";
import { getLevel, getProgress } from "../utils/level";
import { LogOut, Mail, Recycle, Leaf, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, logout } = useAuth();
  const { points } = usePoints();
  const { history } = useHistory();
  const navigate = useNavigate();

  const level = getLevel(points);
  const progress = getProgress(points);

  const fullName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  const initial = fullName.charAt(0).toUpperCase();

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">Profile</h1>

          <p className="text-gray-400 mt-2">
            Manage your account and view your progress.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-3xl font-bold text-black">
              {initial}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{fullName}</h2>

              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Leaf className="text-emerald-400" />
            </div>

            <h3 className="text-gray-400">Eco Points</h3>

            <p className="text-3xl font-bold mt-2">{points}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-blue-400" />
            </div>

            <h3 className="text-gray-400">Current Level</h3>

            <p className="text-xl font-bold mt-2">{level.name}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Recycle className="text-emerald-400" />
            </div>

            <h3 className="text-gray-400">Total Scans</h3>

            <p className="text-3xl font-bold mt-2">{history.length}</p>
          </div>
        </div>

        {/* LEVEL PROGRESS */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between mb-4">
            <span className="font-medium">{level.name}</span>

            <span className="text-gray-400">{points} XP</span>
          </div>

          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-400 mt-3">
            {100 - Math.round(progress)}% to next level
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </DashboardLayout>
  );
}
