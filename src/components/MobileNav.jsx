import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScanSearch,
  History,
  Award,
  User,
} from "lucide-react";

export default function MobileNav() {
  const links = [
    { name: "Home", icon: LayoutDashboard, path: "/" },
    { name: "Scan", icon: ScanSearch, path: "/scan" },
    { name: "History", icon: History, path: "/history" },
    { name: "Rewards", icon: Award, path: "/rewards" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around py-2">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-xs transition ${
                isActive ? "text-emerald-400" : "text-gray-500"
              }`
            }
          >
            <Icon size={20} />
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
}
