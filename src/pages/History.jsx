import DashboardLayout from "../layouts/DashboardLayout";
import { useHistory } from "../context/HistoryContext";
import { Clock3, Recycle, Trash2 } from "lucide-react";

export default function History() {
  const { history, clearHistory } = useHistory();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Scan History</h1>

            <p className="text-gray-400 mt-2">
              Review all waste items analyzed by EcoLoop.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="
                mt-4
                md:mt-0
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                hover:bg-red-500/20
                transition
              "
            >
              <Trash2 size={18} />
              Clear History
            </button>
          )}
        </div>

        {/* History List */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          {history.length === 0 ? (
            <div className="h-[400px] flex flex-col items-center justify-center text-gray-500">
              <Recycle size={50} />

              <p className="mt-4">No scans yet</p>

              <p className="text-sm mt-2">
                Start scanning waste to build your history.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((scan) => (
                <div
                  key={scan.id}
                  className="
                    flex
                    items-center
                    justify-between
                    p-5
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-emerald-500/10
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Recycle className="text-emerald-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{scan.material}</h3>

                      <p className="text-sm text-gray-500">{scan.category}</p>

                      {scan.recyclable && (
                        <p className="text-xs text-emerald-400 mt-1">
                          {scan.recyclable}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">
                      +{scan.points} Points
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 text-sm justify-end mt-1">
                      <Clock3 size={14} />
                      {scan.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
