import { createContext, useContext, useMemo, useState } from "react";

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem("ecoloop_points");

    return saved ? JSON.parse(saved) : 0;
  });

  const addPoints = (amount) => {
    setPoints((prev) => {
      const updated = prev + amount;

      localStorage.setItem("ecoloop_points", JSON.stringify(updated));

      return updated;
    });
  };

  const resetPoints = () => {
    localStorage.removeItem("ecoloop_points");

    setPoints(0);
  };

  const value = useMemo(
    () => ({
      points,
      addPoints,
      resetPoints,
    }),
    [points],
  );

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePoints() {
  return useContext(PointsContext);
}
