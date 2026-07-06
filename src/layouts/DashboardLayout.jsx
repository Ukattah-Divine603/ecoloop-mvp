import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
