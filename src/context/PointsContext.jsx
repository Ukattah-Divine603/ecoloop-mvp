import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setPoints(0);
        setAvatarUrl(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("points, avatar_url")
        .eq("id", user.id)
        .single();

      setPoints(data?.points ?? 0);
      setAvatarUrl(data?.avatar_url ?? null);
      setLoading(false);
    }

    loadProfile();
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

  async function updateAvatar(file) {
    if (!user) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const url = `${publicUrlData.publicUrl}?t=${Date.now()}`;

    await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", user.id);

    setAvatarUrl(url);

    return url;
  }

  return (
    <PointsContext.Provider
      value={{
        points,
        addPoints,
        avatarUrl,
        updateAvatar,
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
