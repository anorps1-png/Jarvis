export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      alertes: {
        Row: {
          categorie: Database["public"]["Enums"]["signalement_categorie"] | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          region: string | null;
          resolue: boolean;
          severite: Database["public"]["Enums"]["alerte_severite"];
          signalement_id: string | null;
          source: string | null;
          titre: string;
          updated_at: string;
          ville: string | null;
        };
        Insert: {
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          region?: string | null;
          resolue?: boolean;
          severite?: Database["public"]["Enums"]["alerte_severite"];
          signalement_id?: string | null;
          source?: string | null;
          titre: string;
          updated_at?: string;
          ville?: string | null;
        };
        Update: {
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          region?: string | null;
          resolue?: boolean;
          severite?: Database["public"]["Enums"]["alerte_severite"];
          signalement_id?: string | null;
          source?: string | null;
          titre?: string;
          updated_at?: string;
          ville?: string | null;
        };
        Relationships: [
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
          affirmation: string;
          auteur_id: string | null;
          created_at: string;
          id: string;
          publie: boolean;
          publie_at: string | null;
          resume: string | null;
          signalement_id: string | null;
          sources: Json;
          titre: string;
          updated_at: string;
          verdict: Database["public"]["Enums"]["factcheck_verdict"];
        };
        Insert: {
          affirmation: string;
          auteur_id?: string | null;
          created_at?: string;
          id?: string;
          publie?: boolean;
          publie_at?: string | null;
          resume?: string | null;
          signalement_id?: string | null;
          sources?: Json;
          titre: string;
          updated_at?: string;
          verdict?: Database["public"]["Enums"]["factcheck_verdict"];
        };
        Update: {
          affirmation?: string;
          auteur_id?: string | null;
          created_at?: string;
          id?: string;
          publie?: boolean;
          publie_at?: string | null;
          resume?: string | null;
          signalement_id?: string | null;
          sources?: Json;
          titre?: string;
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
          created_at: string;
          email: string | null;
          fonction: string | null;
          id: string;
          institution: string | null;
          langue: string | null;
          nom_complet: string | null;
          telephone: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          fonction?: string | null;
          id: string;
          institution?: string | null;
          langue?: string | null;
          nom_complet?: string | null;
          telephone?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          fonction?: string | null;
          id?: string;
          institution?: string | null;
          langue?: string | null;
          nom_complet?: string | null;
          telephone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      signalements: {
        Row: {
          categorie: Database["public"]["Enums"]["signalement_categorie"] | null;
          confidentialite: Database["public"]["Enums"]["signalement_confidentialite"];
          created_at: string;
          description: string | null;
          gps_lat: number | null;
          gps_lng: number | null;
          id: string;
          pays: string | null;
          preuves: Json;
          reference: string;
          region: string | null;
          reporter_id: string | null;
          statut: Database["public"]["Enums"]["signalement_statut"];
          suivi_email: string | null;
          type: Database["public"]["Enums"]["signalement_type"];
          updated_at: string;
          url: string | null;
          ville: string | null;
        };
        Insert: {
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          confidentialite?: Database["public"]["Enums"]["signalement_confidentialite"];
          created_at?: string;
          description?: string | null;
          gps_lat?: number | null;
          gps_lng?: number | null;
          id?: string;
          pays?: string | null;
          preuves?: Json;
          reference?: string;
          region?: string | null;
          reporter_id?: string | null;
          statut?: Database["public"]["Enums"]["signalement_statut"];
          suivi_email?: string | null;
          type: Database["public"]["Enums"]["signalement_type"];
          updated_at?: string;
          url?: string | null;
          ville?: string | null;
        };
        Update: {
          categorie?: Database["public"]["Enums"]["signalement_categorie"] | null;
          confidentialite?: Database["public"]["Enums"]["signalement_confidentialite"];
          created_at?: string;
          description?: string | null;
          gps_lat?: number | null;
          gps_lng?: number | null;
          id?: string;
          pays?: string | null;
          preuves?: Json;
          reference?: string;
          region?: string | null;
          reporter_id?: string | null;
          statut?: Database["public"]["Enums"]["signalement_statut"];
          suivi_email?: string | null;
          type?: Database["public"]["Enums"]["signalement_type"];
          updated_at?: string;
          url?: string | null;
          ville?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      alerte_severite: "info" | "faible" | "moyenne" | "elevee" | "critique";
      factcheck_verdict: "vrai" | "faux" | "trompeur" | "non_verifiable" | "en_cours";
      signalement_categorie:
        | "violence"
        | "desinformation"
        | "harcelement"
        | "escroquerie"
        | "enfance"
        | "haine"
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
  public: {
    Enums: {
      alerte_severite: ["info", "faible", "moyenne", "elevee", "critique"],
      factcheck_verdict: ["vrai", "faux", "trompeur", "non_verifiable", "en_cours"],
      signalement_categorie: [
        "violence",
        "desinformation",
        "harcelement",
        "escroquerie",
        "enfance",
        "haine",
        "autre",
      ],
      signalement_confidentialite: ["anonyme", "restreint", "identifie"],
      signalement_statut: ["nouveau", "en_analyse", "verifie", "rejete", "cloture"],
      signalement_type: ["lien", "image", "video", "audio", "texte", "document"],
    },
  },
} as const;
