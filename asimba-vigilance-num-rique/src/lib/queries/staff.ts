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

// === AUDIT LOGS ===
export function useAuditLogs(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: queryKeys.auditLogs(filters),
    queryFn: async () => {
      let query = supabase.from("audit_logs").select("*");

      // Apply filters if provided
      if (filters.action) query = query.eq("action", filters.action as string);
      if (filters.niveau) query = query.eq("niveau", filters.niveau as string);
      if (filters.acteur_id) query = query.eq("acteur_id", filters.acteur_id as string);

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 5_000,
  });
}

// === UTILISATEURS (PROFILES + USER_ROLES) ===
export function useUtilisateurs() {
  return useQuery({
    queryKey: queryKeys.utilisateurs(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, full_name, institution_id, institutions!inner(nom, sigle)")
        .returns<
          Array<{
            user_id: string;
            full_name: string | null;
            institution_id: string | null;
            institutions: { nom: string; sigle: string } | null;
          }>
        >();

      if (error) throw error;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      const roleMap = new Map(roles?.map((r) => [r.user_id, r.role]) || []);

      return (data || []).map((p) => ({
        ...p,
        role: roleMap.get(p.user_id) || "user",
      }));
    },
    staleTime: 30_000,
  });
}

// === FACT CHECKS ===
export function useFactChecks(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: queryKeys.factChecks(filters),
    queryFn: async () => {
      let query = supabase.from("fact_checks").select("*");

      if (filters.publie) query = query.eq("publie", filters.publie as boolean);
      if (filters.verdict) query = query.eq("verdict", filters.verdict as string);

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 10_000,
  });
}

export function useCreateFactCheck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: TablesInsert<"fact_checks">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("fact_checks")
        .insert([{ ...values, auteur_id: user.id }])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.factChecks({}) });
    },
  });
}

export function useUpdateFactCheck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string } & TablesUpdate<"fact_checks">) => {
      const { error } = await supabase.from("fact_checks").update(values).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.factChecks({}) });
    },
  });
}
