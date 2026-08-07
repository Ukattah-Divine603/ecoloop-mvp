import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setPoints(0);
        setAvatarUrl(null);
        setFullName(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("points, avatar_url, full_name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
      }

      setPoints(data?.points ?? 0);
      setAvatarUrl(data?.avatar_url ?? null);
      setFullName(data?.full_name ?? null);
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
    if (!user) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("scan-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Avatar upload error:", uploadError);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from("scan-images")
        .getPublicUrl(filePath);

      const url = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: url })
        .eq("id", user.id);

      if (updateError) {
        console.error("Avatar DB update error:", updateError);
        return null;
      }

      setAvatarUrl(url);

      return url;
    } catch (err) {
      console.error("Unexpected avatar upload error:", err);
      return null;
    }
  }

  return (
    <PointsContext.Provider
      value={{
        points,
        addPoints,
        avatarUrl,
        updateAvatar,
        fullName,
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
