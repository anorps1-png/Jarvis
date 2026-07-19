import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { queryKeys } from "./query-keys";

type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// === NOTIFICATIONS ===
export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications(undefined),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("destinataire_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 10_000,
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: [...queryKeys.notifications(undefined), "unread"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("destinataire_id", user.id)
        .eq("lu", false)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 10_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ lu: true, lu_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications(undefined) });
    },
  });
}

// === INSTITUTIONS ===
export function useInstitutions() {
  return useQuery({
    queryKey: queryKeys.institutions(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("institutions")
        .select("*")
        .eq("statut", "actif")
        .order("nom");
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useCreateInstitution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: TablesInsert<"institutions">) => {
      const { data, error } = await supabase
        .from("institutions")
        .insert([values])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.institutions() });
    },
  });
}

// === ARTICLES ===
export function useArticles(published = true) {
  return useQuery({
    queryKey: queryKeys.articles({ published }),
    queryFn: async () => {
      let query = supabase.from("articles").select("*");
      if (published) query = query.eq("publie", true);
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 30_000,
  });
}

// === CATEGORIES ===
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("actif", true)
        .order("nom");
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

// === IA CONFIG ===
export function useIaConfig() {
  return useQuery({
    queryKey: queryKeys.iaConfig(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ia_config")
        .select("*")
        .eq("id", 1)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 120_000,
  });
}

export function useIaModeles() {
  return useQuery({
    queryKey: queryKeys.iaModeles(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ia_modeles")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 120_000,
  });
}

// === PREFERENCES ===
export function usePreferences() {
  return useQuery({
    queryKey: queryKeys.preferences(undefined),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("preferences_utilisateur")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: TablesUpdate<"preferences_utilisateur">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("preferences_utilisateur")
        .update(values)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.preferences(undefined) });
    },
  });
}
