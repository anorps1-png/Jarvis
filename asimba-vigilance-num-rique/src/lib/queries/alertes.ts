import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { queryKeys } from "./query-keys";

export type AlertesFilters = {
  region?: string;
  categorie?: Database["public"]["Enums"]["signalement_categorie"];
  severite?: Database["public"]["Enums"]["alerte_severite"];
  statut?: Database["public"]["Enums"]["alerte_statut"];
  search?: string;
  limit?: number;
};

/** Liste dénormalisée alertes+signalements+fact_checks, pour dashboard/liste/carte/statistiques. */
export function useAlertesDashboard(filters: AlertesFilters = {}) {
  return useQuery({
    queryKey: queryKeys.alertesDashboard(filters),
    queryFn: async () => {
      let query = supabase
        .from("v_alertes_dashboard")
        .select("*")
        .order("detecte", { ascending: false });
      if (filters.region) query = query.eq("region", filters.region);
      if (filters.categorie) query = query.eq("categorie", filters.categorie);
      if (filters.severite) query = query.eq("severite", filters.severite);
      if (filters.statut) query = query.eq("statut", filters.statut);
      if (filters.search) query = query.ilike("titre", `%${filters.search}%`);
      if (filters.limit) query = query.limit(filters.limit);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    staleTime: 30_000,
  });
}

export function useDashboardKpis() {
  return useQuery({
    queryKey: queryKeys.dashboardKpis(),
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_dashboard_kpis");
      if (error) throw error;
      return data?.[0] ?? null;
    },
    staleTime: 30_000,
  });
}

export function useRegionsStats() {
  return useQuery({
    queryKey: queryKeys.regionsStats(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_regions_stats")
        .select("*")
        .order("total", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useCategoriesStats() {
  return useQuery({
    queryKey: queryKeys.categoriesStats(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_categories_stats")
        .select("*")
        .order("total", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useSourcesStats() {
  return useQuery({
    queryKey: queryKeys.sourcesStats(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_sources_stats")
        .select("*")
        .order("total", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useTopAnalystes() {
  return useQuery({
    queryKey: queryKeys.topAnalystes(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_top_analystes")
        .select("*")
        .order("total_traites", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}
