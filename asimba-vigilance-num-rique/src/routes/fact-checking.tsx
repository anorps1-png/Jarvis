import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Search, ExternalLink } from "lucide-react";
import { factChecks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fact-checking")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Fact-checking — ASIMBA" },
      { name: "description", content: "Vérification structurée des affirmations circulant en ligne au Cameroun." },
    ],
  }),
  component: FactPage,
});

function StatusBadge({ s }: { s: "vrai" | "faux" | "trompeur" }) {
  const map = {
    vrai: { c: "bg-success/10 text-success ring-success/30", i: CheckCircle2, l: "Vrai" },
    faux: { c: "bg-destructive/10 text-destructive ring-destructive/30", i: XCircle, l: "Faux" },
    trompeur: { c: "bg-warning/15 text-[color:oklch(0.45_0.15_60)] ring-warning/30", i: AlertTriangle, l: "Trompeur" },
  } as const;
  const { c, i: I, l } = map[s];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] font-semibold ring-1", c)}>
      <I className="h-3.5 w-3.5" /> {l}
    </span>
  );
}

function FactPage() {
  return (
    <AppLayout title="Fact-checking" subtitle="Vérifications publiques">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Vérification"
          title="Base des vérifications"
          description="Chaque affirmation est confrontée à des sources officielles et à un score de fiabilité issu du moteur d'analyse."
        />

        <Card className="shadow-elev-1 p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher une affirmation, une rumeur, une source…" className="h-10 pl-8" />
            </div>
            <Button className="h-10">Vérifier</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {factChecks.map((f) => (
            <Card key={f.id} className="shadow-elev-1 flex flex-col">
              <CardContent className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <StatusBadge s={f.statut} />
                  <div className="text-right">
                    <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Confiance</div>
                    <div className="text-[16px] font-semibold tabular-nums">{f.confiance}%</div>
                  </div>
                </div>
                <blockquote className="border-l-2 border-primary pl-3 text-[13.5px] font-medium text-foreground">
                  « {f.affirmation} »
                </blockquote>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">{f.conclusion}</p>
                <div className="mt-auto">
                  <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">Sources</div>
                  <div className="flex flex-wrap gap-1.5">
                    {f.sources.map((s) => (
                      <Badge key={s} variant="secondary" className="gap-1 text-[11px]"><ExternalLink className="h-3 w-3" />{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground border-t border-border pt-2">Publié le {f.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
