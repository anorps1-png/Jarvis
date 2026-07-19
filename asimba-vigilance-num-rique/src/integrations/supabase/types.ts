export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      alertes: {
        Row: {
          assignee_id: string | null;
          categorie: Database["public"]["Enums"]["signalement_categorie"] | null;
          created_at: string | null;
          created_by: string | null;
          id: string;
          mots_cles: string[];
          niveau: string | null;
          propagation: Database["public"]["Enums"]["alerte_propagation"] | null;
          recommandation: string | null;
          resolue_at: string | null;
          resume: string | null;
          severite: Database["public"]["Enums"]["alerte_severite"];
          signalement_id: string | null;
          statut: Database["public"]["Enums"]["alerte_statut"] | null;
          titre: string | null;
          updated_at: string;
        };
        Insert: {
          assignee_id?: string | null;
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          mots_cles?: string[];
          niveau?: string | null;
          propagation?: Database["public"]["Enums"]["alerte_propagation"] | null;
          recommandation?: string | null;
          resolue_at?: string | null;
          resume?: string | null;
          severite?: Database["public"]["Enums"]["alerte_severite"];
          signalement_id?: string | null;
          statut?: Database["public"]["Enums"]["alerte_statut"] | null;
          titre?: string | null;
          updated_at?: string;
        };
        Update: {
          assignee_id?: string | null;
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          mots_cles?: string[];
          niveau?: string | null;
          propagation?: Database["public"]["Enums"]["alerte_propagation"] | null;
          recommandation?: string | null;
          resolue_at?: string | null;
          resume?: string | null;
          severite?: Database["public"]["Enums"]["alerte_severite"];
          signalement_id?: string | null;
          statut?: Database["public"]["Enums"]["alerte_statut"] | null;
          titre?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "alertes_assignee_id_fkey";
            columns: ["assignee_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alertes_signalement_id_fkey";
            columns: ["signalement_id"];
            isOneToOne: false;
            referencedRelation: "signalements";
            referencedColumns: ["id"];
          },
        ];
      };
      fact_checks: {
        Row: {
          affirmation: string | null;
          auteur_id: string | null;
          categorie: string | null;
          confiance: number | null;
          created_at: string | null;
          id: string;
          justification: string | null;
          modele_version: string | null;
          publie: boolean;
          publie_at: string | null;
          score_gravite: number | null;
          score_propagation: number | null;
          score_risque_global: number | null;
          signalement_id: string | null;
          sources: Json;
          titre: string | null;
          updated_at: string;
          verdict: Database["public"]["Enums"]["factcheck_verdict"];
        };
        Insert: {
          affirmation?: string | null;
          auteur_id?: string | null;
          categorie?: string | null;
          confiance?: number | null;
          created_at?: string | null;
          id?: string;
          justification?: string | null;
          modele_version?: string | null;
          publie?: boolean;
          publie_at?: string | null;
          score_gravite?: number | null;
          score_propagation?: number | null;
          score_risque_global?: number | null;
          signalement_id?: string | null;
          sources?: Json;
          titre?: string | null;
          updated_at?: string;
          verdict?: Database["public"]["Enums"]["factcheck_verdict"];
        };
        Update: {
          affirmation?: string | null;
          auteur_id?: string | null;
          categorie?: string | null;
          confiance?: number | null;
          created_at?: string | null;
          id?: string;
          justification?: string | null;
          modele_version?: string | null;
          publie?: boolean;
          publie_at?: string | null;
          score_gravite?: number | null;
          score_propagation?: number | null;
          score_risque_global?: number | null;
          signalement_id?: string | null;
          sources?: Json;
          titre?: string | null;
          updated_at?: string;
          verdict?: Database["public"]["Enums"]["factcheck_verdict"];
        };
        Relationships: [
          {
            foreignKeyName: "fact_checks_signalement_id_fkey";
            columns: ["signalement_id"];
            isOneToOne: false;
            referencedRelation: "signalements";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          fonction: string | null;
          full_name: string | null;
          id: string;
          langue: string;
          role: string | null;
          telephone: string | null;
          updated_at: string;
          ville: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          fonction?: string | null;
          full_name?: string | null;
          id: string;
          langue?: string;
          role?: string | null;
          telephone?: string | null;
          updated_at?: string;
          ville?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          fonction?: string | null;
          full_name?: string | null;
          id?: string;
          langue?: string;
          role?: string | null;
          telephone?: string | null;
          updated_at?: string;
          ville?: string | null;
        };
        Relationships: [];
      };
      signalements: {
        Row: {
          auteur_id: string | null;
          capture_url: string | null;
          categorie: Database["public"]["Enums"]["signalement_categorie"] | null;
          confidentialite: Database["public"]["Enums"]["signalement_confidentialite"];
          contenu: string;
          created_at: string | null;
          description: string | null;
          gps_lat: number | null;
          gps_lng: number | null;
          id: string;
          langue: string | null;
          pays: string;
          plateforme: string | null;
          preuves: Json;
          reference: string;
          region: string | null;
          statut: Database["public"]["Enums"]["signalement_statut"] | null;
          suivi_email: string | null;
          titre: string | null;
          type: Database["public"]["Enums"]["signalement_type"] | null;
          updated_at: string;
          ville: string | null;
          zone: string | null;
        };
        Insert: {
          auteur_id?: string | null;
          capture_url?: string | null;
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          confidentialite?: Database["public"]["Enums"]["signalement_confidentialite"];
          contenu: string;
          created_at?: string | null;
          description?: string | null;
          gps_lat?: number | null;
          gps_lng?: number | null;
          id?: string;
          langue?: string | null;
          pays?: string;
          plateforme?: string | null;
          preuves?: Json;
          reference?: string;
          region?: string | null;
          statut?: Database["public"]["Enums"]["signalement_statut"] | null;
          suivi_email?: string | null;
          titre?: string | null;
          type?: Database["public"]["Enums"]["signalement_type"] | null;
          updated_at?: string;
          ville?: string | null;
          zone?: string | null;
        };
        Update: {
          auteur_id?: string | null;
          capture_url?: string | null;
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          confidentialite?: Database["public"]["Enums"]["signalement_confidentialite"];
          contenu?: string;
          created_at?: string | null;
          description?: string | null;
          gps_lat?: number | null;
          gps_lng?: number | null;
          id?: string;
          langue?: string | null;
          pays?: string;
          plateforme?: string | null;
          preuves?: Json;
          reference?: string;
          region?: string | null;
          statut?: Database["public"]["Enums"]["signalement_statut"] | null;
          suivi_email?: string | null;
          titre?: string | null;
          type?: Database["public"]["Enums"]["signalement_type"] | null;
          updated_at?: string;
          ville?: string | null;
          zone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "signalements_auteur_id_fkey";
            columns: ["auteur_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      v_alertes_dashboard: {
        Row: {
          analyste: string | null;
          assignee_id: string | null;
          categorie: Database["public"]["Enums"]["signalement_categorie"] | null;
          confiance: number | null;
          detecte: string | null;
          extrait: string | null;
          id: string | null;
          langue: string | null;
          mots_cles: string[] | null;
          propagation: Database["public"]["Enums"]["alerte_propagation"] | null;
          recommandation: string | null;
          reference: string | null;
          region: string | null;
          resolue_at: string | null;
          resume: string | null;
          score: number | null;
          severite: Database["public"]["Enums"]["alerte_severite"] | null;
          signalement_id: string | null;
          source: string | null;
          statut: Database["public"]["Enums"]["alerte_statut"] | null;
          titre: string | null;
          ville: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "alertes_assignee_id_fkey";
            columns: ["assignee_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "alertes_signalement_id_fkey";
            columns: ["signalement_id"];
            isOneToOne: false;
            referencedRelation: "signalements";
            referencedColumns: ["id"];
          },
        ];
      };
      v_categories_stats: {
        Row: {
          categorie: Database["public"]["Enums"]["signalement_categorie"] | null;
          total: number | null;
        };
        Relationships: [];
      };
      v_regions_stats: {
        Row: {
          critiques: number | null;
          region: string | null;
          total: number | null;
        };
        Relationships: [];
      };
      v_sources_stats: {
        Row: {
          source: string | null;
          total: number | null;
        };
        Relationships: [];
      };
      v_top_analystes: {
        Row: {
          analyste: string | null;
          assignee_id: string | null;
          duree_moyenne_resolution: string | null;
          total_resolus: number | null;
          total_traites: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "alertes_assignee_id_fkey";
            columns: ["assignee_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      generate_signalement_reference: { Args: never; Returns: string };
      get_alertes_evolution: {
        Args: { jours?: number };
        Returns: {
          critiques: number;
          elevees: number;
          faibles: number;
          jour: string;
          moyennes: number;
        }[];
      };
      get_dashboard_kpis: {
        Args: never;
        Returns: {
          alertes_totales: number;
          alertes_totales_delta_pct: number;
          confiance_ia_moyenne: number;
          critiques: number;
          critiques_delta_pct: number;
          en_cours: number;
          en_cours_delta_pct: number;
          resolues: number;
          resolues_delta_pct: number;
          signalements_jour: number;
          temps_moyen_secondes: number;
        }[];
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_admin: { Args: { _user_id: string }; Returns: boolean };
      is_profile_admin_or_partner: {
        Args: { _user_id: string };
        Returns: boolean;
      };
      is_staff: { Args: { _user_id: string }; Returns: boolean };
      pct_delta: {
        Args: { courant: number; precedent: number };
        Returns: number;
      };
    };
    Enums: {
      alerte_propagation: "tres_rapide" | "rapide" | "moderee" | "lente";
      alerte_severite: "info" | "faible" | "moyenne" | "elevee" | "critique";
      alerte_statut: "nouveau" | "en_cours" | "assigne" | "resolu" | "clos";
      app_role: "admin" | "manager" | "analyste_senior" | "analyste" | "institution" | "citoyen";
      factcheck_verdict: "vrai" | "faux" | "trompeur" | "non_verifiable" | "en_cours";
      signalement_categorie:
        | "violence"
        | "desinformation"
        | "harcelement"
        | "escroquerie"
        | "enfance"
        | "haine"
        | "atteintes_sexuelles"
        | "cybercriminalite"
        | "autre";
      signalement_confidentialite: "anonyme" | "restreint" | "identifie";
      signalement_statut: "nouveau" | "en_analyse" | "verifie" | "rejete" | "cloture";
      signalement_type: "lien" | "image" | "video" | "audio" | "texte" | "document";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      alerte_propagation: ["tres_rapide", "rapide", "moderee", "lente"],
      alerte_severite: ["info", "faible", "moyenne", "elevee", "critique"],
      alerte_statut: ["nouveau", "en_cours", "assigne", "resolu", "clos"],
      app_role: ["admin", "manager", "analyste_senior", "analyste", "institution", "citoyen"],
      factcheck_verdict: ["vrai", "faux", "trompeur", "non_verifiable", "en_cours"],
      signalement_categorie: [
        "violence",
        "desinformation",
        "harcelement",
        "escroquerie",
        "enfance",
        "haine",
        "atteintes_sexuelles",
        "cybercriminalite",
        "autre",
      ],
      signalement_confidentialite: ["anonyme", "restreint", "identifie"],
      signalement_statut: ["nouveau", "en_analyse", "verifie", "rejete", "cloture"],
      signalement_type: ["lien", "image", "video", "audio", "texte", "document"],
    },
  },
} as const;
