import DashboardLayout from "../layouts/DashboardLayout";

import { usePoints } from "../context/PointsContext";

import { BADGES, getUnlockedBadges } from "../utils/badges";

import { Award, Lock } from "lucide-react";

export default function Rewards() {
  const { points } = usePoints();

  const unlocked = getUnlockedBadges(points);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">Rewards & Badges</h1>

          <p className="text-gray-400 mt-2">
            Unlock achievements by earning Eco Points.
          </p>
        </div>

        {/* POINTS */}
        <div
          className="
          rounded-3xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          p-6
        "
        >
          <h2 className="text-gray-400">Current Eco Points</h2>

          <p className="text-5xl font-bold mt-2">{points}</p>
        </div>

        {/* BADGES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BADGES.map((badge) => {
            const earned = unlocked.find((b) => b.id === badge.id);

            return (
              <div
                key={badge.id}
                className={`
                  rounded-3xl
                  p-6
                  border
                  transition

                  ${
                    earned
                      ? `
                        bg-emerald-500/10
                        border-emerald-500/30
                      `
                      : `
                        bg-white/5
                        border-white/10
                        opacity-60
                      `
                  }
                `}
              >
                <div className="flex justify-between">
                  {earned ? (
                    <Award
                      size={32}
                      className="
                        text-yellow-400
                      "
                    />
                  ) : (
                    <Lock
                      size={32}
                      className="
                        text-gray-500
                      "
                    />
                  )}
                </div>

                <h3 className="text-2xl mt-6 font-bold">{badge.title}</h3>

                <p className="text-gray-400 mt-2">
                  Unlock at {badge.required} points
                </p>

                <div className="mt-5">
                  {earned ? (
                    <span
                      className="
                        text-emerald-400
                        font-semibold
                      "
                    >
                      Unlocked
                    </span>
                  ) : (
                    <span
                      className="
                        text-gray-500
                      "
                    >
                      Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
