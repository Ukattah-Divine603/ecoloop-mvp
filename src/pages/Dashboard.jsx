import DashboardLayout from "../layouts/DashboardLayout";

import { usePoints } from "../context/PointsContext";
import { useHistory } from "../context/HistoryContext";

import { getLevel, getProgress } from "../utils/level";

import { Leaf, Award, TrendingUp, Recycle, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  const { points } = usePoints();

  const { history } = useHistory();

  const scans = history.length;

  const level = getLevel(points);

  const progress = getProgress(points);

  const badges = Math.floor(points / 20);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HERO */}
        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-r
            from-emerald-500/20
            via-emerald-400/10
            to-transparent
            p-8
          "
        >
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-3">Welcome Back, Divine</h1>

            <p className="text-gray-300">
              Every item you scan contributes to a cleaner environment and
              pushes you closer to becoming a Planet Protector.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Eco Points */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <Leaf className="text-emerald-400" />

              <ArrowUpRight className="text-gray-500" />
            </div>

            <h3 className="mt-4 text-gray-400">Eco Points</h3>

            <p className="text-4xl font-bold mt-2">{points}</p>
          </div>

          {/* Level */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="text-blue-400" />

              <ArrowUpRight className="text-gray-500" />
            </div>

            <h3 className="mt-4 text-gray-400">Current Level</h3>

            <p className="text-2xl font-bold mt-2">{level.name}</p>
          </div>

          {/* Scans */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <Recycle className="text-emerald-400" />

              <ArrowUpRight className="text-gray-500" />
            </div>

            <h3 className="mt-4 text-gray-400">Total Scans</h3>

            <p className="text-4xl font-bold mt-2">{scans}</p>
          </div>

          {/* Badges */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <Award className="text-yellow-400" />

              <ArrowUpRight className="text-gray-500" />
            </div>

            <h3 className="mt-4 text-gray-400">Badges Earned</h3>

            <p className="text-4xl font-bold mt-2">{badges}</p>
          </div>
        </section>

        {/* LEVEL PROGRESS */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between mb-4">
            <span className="font-medium">{level.name}</span>

            <span className="text-gray-400">{points} XP</span>
          </div>

          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="
                h-full
                bg-gradient-to-r
                from-emerald-500
                to-green-400
                transition-all
                duration-700
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-gray-400 mt-3">
            {100 - Math.round(progress)}% remaining
          </p>
        </section>

        {/* RECENT SCANS */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Scans</h2>

          {history.length === 0 ? (
            <div className="text-gray-500">No scans yet</div>
          ) : (
            <div className="space-y-4">
              {history.slice(0, 5).map((scan) => (
                <div
                  key={scan.id}
                  className="
                    flex
                    justify-between
                    items-center
                    border-b
                    border-white/10
                    pb-3
                  "
                >
                  <div>
                    <p>{scan.material}</p>

                    <p className="text-xs text-gray-500">{scan.date}</p>
                  </div>

                  <span className="text-emerald-400">+{scan.points} XP</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
