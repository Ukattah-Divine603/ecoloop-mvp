import { ScanSearch, Leaf, Award } from "lucide-react";

export default function AnalysisCard({
  material,
  recyclable,
  category,
  decomposition,
  points,
}) {
  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <ScanSearch className="text-emerald-400" />

        <h2 className="font-semibold">AI Analysis</h2>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between">
          <span className="text-gray-400">Material</span>

          <span>{material}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Recyclable</span>

          <span className="text-emerald-400">{recyclable}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Category</span>

          <span>{category}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Decomposition Time</span>

          <span>{decomposition}</span>
        </div>
      </div>

      <div
        className="
          mt-8
          bg-emerald-500/10
          border
          border-emerald-500/20
          rounded-2xl
          p-5
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <Leaf className="text-emerald-400" />

          <span>+{points} Eco Points Earned</span>
        </div>

        <div className="flex items-center gap-3">
          <Award className="text-yellow-400" />

          <span>Badge Progress Updated</span>
        </div>
      </div>
    </div>
  );
}
