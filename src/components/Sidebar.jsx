import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScanSearch,
  History,
  Award,
  User,
  Leaf,
  X,
} from "lucide-react";
import { usePoints } from "../context/PointsContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { avatarUrl, fullName } = usePoints();
  const { user } = useAuth();

  const displayName = fullName || user?.email?.split("@")[0] || "User";

  const initial = displayName.charAt(0).toUpperCase();

  const links = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Scan", icon: ScanSearch, path: "/scan" },
    { name: "History", icon: History, path: "/history" },
    { name: "Rewards", icon: Award, path: "/rewards" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-0
          h-screen
          w-72
          border-r
          border-white/10
          bg-black/90
          md:bg-black/20
          backdrop-blur-xl
          flex
          flex-col
          z-50
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="text-emerald-400" />
            <h1 className="text-2xl font-bold">EcoLoop</h1>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition
                  ${isActive ? "bg-emerald-500 text-black" : "hover:bg-white/5"}
                  `
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        <NavLink
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 p-4 border-t border-white/10 hover:bg-white/5 transition flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center font-bold text-black flex-shrink-0">
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

          <div className="min-w-0">
            <p className="font-medium truncate">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </NavLink>
      </aside>
    </>
  );
}
