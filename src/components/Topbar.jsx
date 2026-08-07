import { useState } from "react";
import { Bell, Search, Menu, Check, CheckCheck } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Topbar({ onMenuClick }) {
  const { notifications, markRead, markAllRead, unreadCount } =
    useNotifications();
  const [showPanel, setShowPanel] = useState(false);

  return (
    <header className="h-16 md:h-20 border-b border-white/10 flex items-center justify-between px-4 md:px-6 gap-3 relative">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg hover:bg-white/10 flex-shrink-0"
      >
        <Menu size={22} />
      </button>

      <div className="hidden sm:flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 w-full max-w-xs md:max-w-sm">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="relative ml-auto sm:ml-0">
        <button
          onClick={() => setShowPanel((prev) => !prev)}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 relative flex-shrink-0"
        >
          <Bell size={20} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {showPanel && (
          <>
            <div
              onClick={() => setShowPanel(false)}
              className="fixed inset-0 z-40"
            />

            <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-zinc-900 border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <h3 className="font-semibold">Notifications</h3>

                {notifications.length > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    <CheckCheck size={14} />
                    Read all
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center text-gray-500 text-sm">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 ${
                        n.read ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {timeAgo(n.createdAt)}
                        </p>
                      </div>

                      {!n.read && (
                        <button
                          onClick={() => markRead(n.id)}
                          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 flex-shrink-0 mt-0.5"
                        >
                          <Check size={14} />
                          Read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
