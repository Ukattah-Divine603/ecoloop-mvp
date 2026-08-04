import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScanSearch,
  History,
  Award,
  User,
  Leaf,
} from "lucide-react";
import { usePoints } from "../context/PointsContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { avatarUrl, fullName } = usePoints();
  const { user } = useAuth();

  const displayName = fullName || user?.email?.split("@")[0] || "User";

  const initial = displayName.charAt(0).toUpperCase();

  const links = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Scan",
      icon: ScanSearch,
      path: "/scan",
    },
    {
      name: "History",
      icon: History,
      path: "/history",
    },
    {
      name: "Rewards",
      icon: Award,
      path: "/rewards",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <aside
      className="
      hidden
      md:flex
      flex-col
      w-72
      h-screen
      sticky
      top-0
      border-r
      border-white/10
      bg-black/20
      backdrop-blur-xl
      "
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Leaf className="text-emerald-400" />

          <h1 className="text-2xl font-bold">EcoLoop</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
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
  );
}
