import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 md:h-20 border-b border-white/10 flex items-center justify-between px-4 md:px-6">
      <div className="hidden sm:flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 w-full max-w-xs md:max-w-sm">
        <Search size={18} />

        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 ml-auto sm:ml-0">
        <Bell size={20} />
      </button>
    </header>
  );
}
