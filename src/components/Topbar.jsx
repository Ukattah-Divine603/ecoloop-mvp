import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
      h-20
      border-b
      border-white/10
      flex
      items-center
      justify-between
      px-6
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        bg-white/5
        rounded-xl
        px-4
        py-2
        w-80
        "
      >
        <Search size={18} />

        <input
          placeholder="Search..."
          className="
          bg-transparent
          outline-none
          w-full
          "
        />
      </div>

      <button
        className="
        p-3
        rounded-xl
        bg-white/5
        hover:bg-white/10
        "
      >
        <Bell size={20} />
      </button>
    </header>
  );
}
