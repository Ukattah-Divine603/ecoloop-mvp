import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScanSearch,
  History,
  Award,
  User,
  Leaf,
} from "lucide-react";

export default function Sidebar() {
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

      <nav className="flex-1 p-4 space-y-2">
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
    </aside>
  );
}
