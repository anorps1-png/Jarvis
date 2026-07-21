import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { analyzeTextWithIaFn } from "./analyse-ia";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  ExternalLink,
  Loader2,
  Clock,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useFactChecks } from "@/lib/queries/staff";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type FactCheck = Database["public"]["Tables"]["fact_checks"]["Row"];

export type SessionFactCheck = {
  id: string;
  query: string;
  titre: string;
  verdict: "vrai" | "faux" | "trompeur";
  justification: string;
  confiance: number;
  sources: string[];
  timestamp: string;
};

export const Route = createFileRoute("/fact-checking")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Fact-checking — ASIMBA" },
      {
        name: "description",
        content: "Vérification structurée des affirmations circulant en ligne au Cameroun.",
      },
    ],
  }),
  component: FactPage,
});

function StatusBadge({ verdict }: { verdict: FactCheck["verdict"] }) {
  const map: Record<string, { c: string; i: LucideIcon; l: string }> = {
    vrai: { c: "bg-success/10 text-success ring-success/30", i: CheckCircle2, l: "Vrai" },
    faux: { c: "bg-destructive/10 text-destructive ring-destructive/30", i: XCircle, l: "Faux" },
    trompeur: {
      c: "bg-warning/15 text-[color:oklch(0.45_0.15_60)] ring-warning/30",
      i: AlertTriangle,
      l: "Trompeur",
    },
    en_cours: {
      c: "bg-blue-10 text-blue-600 ring-blue-200",
      i: AlertTriangle,
      l: "En cours",
    },
  };
  const entry = map[verdict] || map.en_cours;
  const I = entry.i;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] font-semibold ring-1",
        entry.c,
      )}
    >
      <I className="h-3.5 w-3.5" /> {entry.l}
    </span>
  );
}

function FactPage() {
  const { data: factChecks, isLoading } = useFactChecks({ publie: true });
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [activeTab, setActiveTab] = useState<"session" | "all">("session");

  // Historique des recherches de la session en cours
  const [sessionHistory, setSessionHistory] = useState<SessionFactCheck[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = sessionStorage.getItem("asimba_fact_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("asimba_fact_history", JSON.stringify(sessionHistory));
    } catch (e) {
      console.error("[SessionStorage Error]", e);
    }
  }, [sessionHistory]);

  const filteredPublic = useMemo(() => {
    if (!factChecks) return [];
    const lower = searchTerm.toLowerCase();
    return factChecks.filter(
      (f: FactCheck) =>
        (f.affirmation?.toLowerCase() || "").includes(lower) ||
        (f.titre?.toLowerCase() || "").includes(lower),
    );
  }, [factChecks, searchTerm]);

  const filteredSession = useMemo(() => {
    if (!searchTerm.trim()) return sessionHistory;
    const lower = searchTerm.toLowerCase();
    return sessionHistory.filter(
      (item) =>
        item.query.toLowerCase().includes(lower) || item.titre.toLowerCase().includes(lower),
    );
  }, [sessionHistory, searchTerm]);

  async function handleVerify() {
    if (!searchTerm.trim()) {
      toast.error("Veuillez saisir une affirmation à fact-checker.");
      return;
    }
    setIsChecking(true);
    toast.info("Analyse en cours par l'IA...", { description: "Veuillez patienter pendant l'évaluation." });

    try {
      const res = await analyzeTextWithIaFn({ data: searchTerm.trim() });
      if (res && res.success && res.data) {
        const aiData = res.data;

        const {
          data: { user },
        } = await supabase.auth.getUser();

        // Insertion dans la base de données Supabase
        const { data: inserted, error } = await supabase
          .from("fact_checks")
          .insert({
            affirmation: searchTerm.trim(),
            titre: aiData.category || "Vérification automatisée",
            verdict: (aiData.verdict || "trompeur") as "vrai" | "faux" | "trompeur",
            justification: aiData.conclusion,
            confiance: aiData.score,
            sources: aiData.sources || ["ASIMBA AI"],
            publie: true,
            publie_at: new Date().toISOString(),
            auteur_id: user?.id ?? null,
          })
          .select()
          .single();

        if (error) {
          console.warn("[Fact-check DB insert warn]", error);
        }

        // Ajouter l'élément à l'historique de session local
        const newSessionItem: SessionFactCheck = {
          id: inserted?.id || String(Date.now()),
          query: searchTerm.trim(),
          titre: aiData.category || "Vérification automatisée",
          verdict: (aiData.verdict || "trompeur") as "vrai" | "faux" | "trompeur",
          justification: aiData.conclusion,
          confiance: aiData.score,
          sources: aiData.sources || ["ASIMBA AI"],
          timestamp: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setSessionHistory((prev) => [newSessionItem, ...prev]);
        setActiveTab("session");

        toast.success("Fact-checking terminé !", {
          description: `Verdict : ${aiData.verdict.toUpperCase()} (Indice : ${aiData.score}%)`,
        });
        setSearchTerm("");
        queryClient.invalidateQueries({ queryKey: ["fact_checks"] });
      } else {
        throw new Error(res?.error || "Une erreur inconnue s'est produite lors de l'analyse.");
      }
    } catch (err: any) {
      console.error("[Fact-checking Error]", err);
      toast.error("Erreur de fact-checking", {
        description: err.message || "Impossible de joindre le serveur d'analyse.",
      });
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <AppLayout title="Fact-checking" subtitle="Vérifications publiques">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Vérification"
          title="Base des vérifications & Historique de session"
          description="Chaque affirmation est confrontée à des sources officielles et évaluée par le moteur d'IA."
        />

        {/* Barre de recherche et action de vérification */}
        <Card className="shadow-elev-1 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ex. « on a annulé le bacc au cameroun ? »..."
                className="h-10 pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isChecking) {
                    handleVerify();
                  }
                }}
                disabled={isChecking}
              />
            </div>
            <Button className="h-10 gap-1.5" onClick={handleVerify} disabled={isChecking}>
              {isChecking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isChecking ? "Vérification..." : "Vérifier"}
            </Button>
          </div>

          {/* Raccourcis / Historique rapide de session */}
          {sessionHistory.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11.5px]">
              <span className="text-muted-foreground font-medium flex items-center gap-1 mr-1">
                <Clock className="h-3 w-3" /> Recherches de session :
              </span>
              {sessionHistory.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSearchTerm(item.query)}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 font-medium text-foreground hover:bg-accent transition-colors"
                >
                  {item.query.length > 30 ? `${item.query.substring(0, 30)}...` : item.query}
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Onglets : Historique de session VS Base globale */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "session" ? "default" : "outline"}
              size="sm"
              className="gap-1.5 text-[12.5px]"
              onClick={() => setActiveTab("session")}
            >
              <Clock className="h-3.5 w-3.5" />
              Historique de session ({sessionHistory.length})
            </Button>
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              size="sm"
              className="gap-1.5 text-[12.5px]"
              onClick={() => setActiveTab("all")}
            >
              <Globe className="h-3.5 w-3.5" />
              Toutes les vérifications publiques ({factChecks?.length || 0})
            </Button>
          </div>
          {sessionHistory.length > 0 && activeTab === "session" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-[11.5px] text-muted-foreground hover:text-destructive"
              onClick={() => {
                setSessionHistory([]);
                sessionStorage.removeItem("asimba_fact_history");
                toast.info("Historique de session réinitialisé.");
              }}
            >
              Effacer l'historique
            </Button>
          )}
        </div>

        {/* VUE 1 : HISTORIQUE DE LA SESSION COURANTE */}
        {activeTab === "session" && (
          <div>
            {filteredSession.length === 0 ? (
              <Card className="p-8 text-center space-y-3">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto" />
                <div className="text-[14px] font-semibold">Aucune recherche effectuée dans cette session</div>
                <p className="text-[12.5px] text-muted-foreground max-w-md mx-auto">
                  Saisissez une affirmation dans la barre de recherche ci-dessus puis cliquez sur « Vérifier ». Vos résultats apparaîtront immédiatement dans cet historique de session.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredSession.map((item) => (
                  <Card key={item.id} className="shadow-elev-1 flex flex-col border-primary/20 bg-card">
                    <CardContent className="p-5 flex-1 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <StatusBadge verdict={item.verdict} />
                          <span className="text-[10.5px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {item.timestamp}
                          </span>
                        </div>
                        {item.confiance && (
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              Confiance
                            </div>
                            <div className="text-[15px] font-bold tabular-nums text-foreground">
                              {Math.round(item.confiance)}%
                            </div>
                          </div>
                        )}
                      </div>

                      <blockquote className="border-l-2 border-primary pl-3 text-[13.5px] font-medium text-foreground">
                        « {item.query} »
                      </blockquote>

                      {item.titre && (
                        <div className="text-[12px] font-semibold text-primary">{item.titre}</div>
                      )}

                      {item.justification && (
                        <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                          {item.justification}
                        </p>
                      )}

                      <div className="mt-auto pt-2">
                        {Array.isArray(item.sources) && item.sources.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.sources.map((s) => (
                              <Badge key={s} variant="secondary" className="gap-1 text-[10.5px]">
                                <ExternalLink className="h-3 w-3" />
                                {s}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VUE 2 : BASE GLOBALE PUBLIQUE */}
        {activeTab === "all" && (
          <div>
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">Chargement de la base publique...</div>
            ) : filteredPublic.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                {searchTerm ? "Aucune vérification trouvée" : "Aucune vérification publique"}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredPublic.map((f: FactCheck) => (
                  <Card key={f.id} className="shadow-elev-1 flex flex-col">
                    <CardContent className="p-5 flex-1 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <StatusBadge verdict={f.verdict} />
                        {f.confiance && (
                          <div className="text-right">
                            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
                              Confiance
                            </div>
                            <div className="text-[16px] font-semibold tabular-nums">
                              {Math.round(f.confiance)}%
                            </div>
                          </div>
                        )}
                      </div>
                      {f.affirmation && (
                        <blockquote className="border-l-2 border-primary pl-3 text-[13.5px] font-medium text-foreground">
                          « {f.affirmation} »
                        </blockquote>
                      )}
                      {f.titre && (
                        <div className="text-[12.5px] font-semibold">{f.titre}</div>
                      )}
                      {f.justification && (
                        <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                          {f.justification}
                        </p>
                      )}
                      <div className="mt-auto">
                        {Array.isArray(f.sources) && f.sources.length > 0 && (
                          <>
                            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
                              Sources
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {(f.sources as string[]).map((s) => (
                                <Badge key={s} variant="secondary" className="gap-1 text-[11px]">
                                  <ExternalLink className="h-3 w-3" />
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground border-t border-border pt-2">
                        {f.publie_at ? new Date(f.publie_at).toLocaleDateString("fr-FR") : "Non daté"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
