import { motion } from "framer-motion";
import { ScanSearch } from "lucide-react";

export default function ScanLoader({ step }) {
  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
      "
    >
      <div className="flex items-center gap-3 mb-8">
        <ScanSearch className="text-emerald-400" />

        <h2 className="text-xl font-semibold">AI Analysis</h2>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          w-12
          h-12
          border-4
          border-white/10
          border-t-emerald-400
          rounded-full
          mb-8
        "
      />

      <div className="space-y-4">
        <p className="text-gray-300">{step}</p>

        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="
              h-full
              w-1/2
              bg-emerald-500
            "
          />
        </div>
      </div>
    </div>
  );
}
