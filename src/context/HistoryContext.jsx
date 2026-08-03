import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) {
        setHistory([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("scans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading history:", error);
      }

      const formatted = (data ?? []).map((scan) => ({
        id: scan.id,
        material: scan.material,
        recyclable: scan.recyclable,
        category: scan.category,
        decomposition: scan.decomposition,
        points: scan.points,
        image_url: scan.image_url,
        date: new Date(scan.created_at).toLocaleDateString(),
      }));

      setHistory(formatted);
      setLoading(false);
    }

    loadHistory();
  }, [user]);

  async function addScan(scan) {
    if (!user) return;

    const { data, error } = await supabase
      .from("scans")
      .insert({
        user_id: user.id,
        material: scan.material,
        recyclable: scan.recyclable,
        category: scan.category,
        decomposition: scan.decomposition,
        points: scan.points,
        image_url: scan.image_url ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving scan:", error);
      return;
    }

    const newScan = {
      id: data.id,
      material: data.material,
      recyclable: data.recyclable,
      category: data.category,
      decomposition: data.decomposition,
      points: data.points,
      image_url: data.image_url,
      date: new Date(data.created_at).toLocaleDateString(),
    };

    setHistory((prev) => [newScan, ...prev]);
  }

  async function clearHistory() {
    if (!user) return;

    const { error } = await supabase
      .from("scans")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error clearing history:", error);
      return;
    }

    setHistory([]);
  }

  return (
    <HistoryContext.Provider
      value={{
        history,
        addScan,
        clearHistory,
        loading,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHistory() {
  return useContext(HistoryContext);
}
