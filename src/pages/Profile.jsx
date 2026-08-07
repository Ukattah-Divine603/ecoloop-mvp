import { useRef, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { usePoints } from "../context/PointsContext";
import { useHistory } from "../context/HistoryContext";
import { useNotifications } from "../context/NotificationContext";
import { getLevel, getProgress } from "../utils/level";
import {
  LogOut,
  Mail,
  Recycle,
  Leaf,
  TrendingUp,
  Camera,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CameraCapture from "../components/CameraCapture";

export default function Profile() {
  const { user, logout } = useAuth();
  const { points, avatarUrl, updateAvatar, fullName } = usePoints();
  const { history } = useHistory();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const level = getLevel(points);
  const progress = getProgress(points);

  const displayName = fullName || user?.email?.split("@")[0] || "User";

  const initial = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    await logout();
    addNotification("You've been logged out.");
    toast.success("New Notification!");
    navigate("/login");
  }

  async function uploadFile(file) {
    setUploading(true);

    const url = await updateAvatar(file);

    setUploading(false);

    if (url) {
      addNotification("Your profile picture was updated successfully.");
      toast.success("New Notification!");
    } else {
      addNotification(
        "Failed to update your profile picture. Please try again.",
      );
      toast.error("New Notification!");
    }
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    await uploadFile(file);
  }

  async function handleCameraCapture(file) {
    setShowCamera(false);
    await uploadFile(file);
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
            <div className="relative">
              <div
                onClick={() => avatarUrl && setShowPreview(true)}
                className={`w-20 h-20 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-3xl font-bold text-black ${
                  avatarUrl ? "cursor-pointer" : ""
                }`}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initial
                )}
              </div>

              <button
                onClick={() => setShowOptions((prev) => !prev)}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center hover:bg-emerald-400 transition"
              >
                <Camera size={14} className="text-black" />
              </button>

              {showOptions && (
                <div className="absolute top-full mt-2 left-0 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-20 w-44 shadow-xl">
                  <button
                    onClick={() => {
                      setShowOptions(false);
                      setShowCamera(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition text-sm"
                  >
                    <Camera size={16} />
                    Take Photo
                  </button>

                  <button
                    onClick={() => {
                      setShowOptions(false);
                      fileInputRef.current?.click();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition text-sm border-t border-white/10"
                  >
                    <ImageIcon size={16} />
                    Upload Photo
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">{displayName}</h2>

              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>

              {uploading && (
                <p className="text-emerald-400 text-sm mt-2">Uploading...</p>
              )}
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

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {showPreview && avatarUrl && (
        <div
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <img
            src={avatarUrl}
            alt="Profile preview"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-2xl object-contain"
          />
        </div>
      )}
    </DashboardLayout>
  );
}
