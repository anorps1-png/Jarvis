import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader, SeverityBadge, StatusPill } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { alerts, formatDateTime } from "@/lib/mock-data";
import { CheckCircle2, MessageSquare, PaperclipIcon, UserPlus, FileDown, Users2 } from "lucide-react";

export const Route = createFileRoute("/incidents")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Gestion des incidents — ASIMBA" },
      { name: "description", content: "Suivi des incidents, assignation, historique et clôture." },
    ],
  }),
  component: IncidentsPage,
});

function IncidentsPage() {
  const incident = alerts[0];
  const list = alerts.slice(0, 8);

  return (
    <AppLayout title="Gestion des incidents" subtitle="Cases actifs et historique">
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Case management"
          title="Incidents en traitement"
          description="Coordonnez les équipes d'analystes et suivez chaque incident jusqu'à sa clôture."
          actions={
            <>
              <Button variant="outline" size="sm" className="h-9 gap-1.5"><Users2 className="h-3.5 w-3.5" /> Assigner en masse</Button>
              <Button size="sm" className="h-9 gap-1.5"><FileDown className="h-3.5 w-3.5" /> Export PDF</Button>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
          <Card className="shadow-elev-1">
            <div className="border-b border-border p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Incidents ({list.length})</div>
            </div>
            <div className="divide-y divide-border">
              {list.map((a, i) => (
                <button key={a.id} className={`w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors ${i === 0 ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-muted-foreground">{a.reference}</span>
                    <SeverityBadge level={a.severite} />
                  </div>
                  <div className="text-[12.5px] font-medium text-foreground truncate">{a.titre}</div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{a.ville} · {a.source}</span>
                    <span>{a.analyste ?? "Non assigné"}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="shadow-elev-1">
            <div className="border-b border-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[11.5px] text-muted-foreground">{incident.reference}</span>
                    <SeverityBadge level={incident.severite} />
                    <StatusPill status={incident.statut} />
                  </div>
                  <h2 className="text-[17px] font-semibold text-foreground">{incident.titre}</h2>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">
                    Publié sur {incident.source} · Signalé par un citoyen · Détecté le {formatDateTime(incident.detecte)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1.5"><UserPlus className="h-3.5 w-3.5" /> Assigner</Button>
                  <Button size="sm" className="h-9 gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Clôturer</Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="analyse" className="p-5">
              <TabsList className="mb-4">
                <TabsTrigger value="analyse">Analyse</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="comments">Commentaires</TabsTrigger>
                <TabsTrigger value="attach">Pièces jointes</TabsTrigger>
              </TabsList>

              <TabsContent value="analyse" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Meta label="Score" value={`${incident.score}/100`} />
                  <Meta label="Confiance IA" value={`${incident.confiance}%`} />
                  <Meta label="Langue" value={incident.langue} />
                  <Meta label="Propagation" value={incident.propagation} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Résumé</div>
                  <p className="text-[13px] leading-relaxed text-foreground">{incident.resume}</p>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Mots-clés</div>
                  <div className="flex flex-wrap gap-1.5">
                    {incident.motsCles.map((m) => (
                      <Badge key={m} variant="secondary" className="rounded-md text-[11px]">{m}</Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-md border-l-2 border-warning bg-warning/5 p-3 text-[12.5px]">
                  <div className="font-semibold text-[11px] uppercase tracking-wider text-[color:oklch(0.45_0.15_60)] mb-1">Recommandation</div>
                  {incident.recommandation}
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <ol className="relative border-l border-border pl-5 space-y-4">
                  {[
                    { t: "12:04", who: "Système", txt: "Contenu ingéré depuis Facebook Graph API" },
                    { t: "12:04", who: "ASIMBA-AI", txt: "Score de risque calculé : 92/100 (critique)" },
                    { t: "12:05", who: "Système", txt: "Alerte automatique envoyée à la BSC" },
                    { t: "12:12", who: "N. Mbarga", txt: "A pris en charge l'incident" },
                    { t: "12:18", who: "N. Mbarga", txt: "A ajouté un commentaire" },
                    { t: "12:22", who: "S. Ekambi", txt: "A validé la classification" },
                  ].map((e, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                      <div className="text-[11px] font-mono text-muted-foreground">{e.t}</div>
                      <div className="text-[13px]"><span className="font-medium">{e.who}</span> · {e.txt}</div>
                    </li>
                  ))}
                </ol>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                {[
                  { who: "N. Mbarga", role: "Analyste senior", t: "il y a 12 min", txt: "Vérification en cours avec la BSC. Le compte source est actif depuis 2023 et a déjà été signalé." },
                  { who: "S. Ekambi", role: "Analyste", t: "il y a 6 min", txt: "Classification confirmée. Deux comptes relais identifiés, à surveiller." },
                ].map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">{c.who.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                    <div className="flex-1 rounded-lg border border-border bg-card p-3">
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="font-medium">{c.who}</span>
                        <span className="text-muted-foreground">· {c.role} · {c.t}</span>
                      </div>
                      <p className="mt-1 text-[13px] text-foreground">{c.txt}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input placeholder="Ajouter un commentaire…" className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-[12.5px]" />
                  <Button size="sm" className="h-10 gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> Publier</Button>
                </div>
              </TabsContent>

              <TabsContent value="attach">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["capture_1.png", "capture_2.png", "rapport.pdf", "transcription.txt"].map((f) => (
                    <div key={f} className="rounded-md border border-border p-3 flex items-center gap-2 text-[12px]">
                      <PaperclipIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-3">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-[15px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function CardHeaderBar({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-border px-5 py-3">{children}</div>;
}
