import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPoints() {
      if (!user) {
        setPoints(0);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", user.id)
        .single();

      setPoints(data?.points ?? 0);
      setLoading(false);
    }

    loadPoints();
  }, [user]);

  async function addPoints(amount) {
    if (!user) return;

    const newPoints = points + amount;

    setPoints(newPoints);

    await supabase
      .from("profiles")
      .update({ points: newPoints })
      .eq("id", user.id);
  }

  return (
    <PointsContext.Provider
      value={{
        points,
        addPoints,
        loading,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePoints() {
  return useContext(PointsContext);
}
