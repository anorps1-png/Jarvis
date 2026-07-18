import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { KeyRound, Plug, ShieldCheck, Sparkles, Copy, Plus } from "lucide-react";

export const Route = createFileRoute("/administration")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Administration — ASIMBA" },
      { name: "description", content: "Rôles, permissions, catégories, IA et intégrations." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <AppLayout title="Administration" subtitle="Configuration avancée de la plateforme">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Console d'administration"
          title="Configuration de la plateforme"
          description="Rôles, catégories, seuils IA, intégrations et clés d'accès."
        />

        <Tabs defaultValue="roles">
          <TabsList>
            <TabsTrigger value="roles">Rôles & permissions</TabsTrigger>
            <TabsTrigger value="cats">Catégories & mots-clés</TabsTrigger>
            <TabsTrigger value="ai">Paramètres IA</TabsTrigger>
            <TabsTrigger value="keys">Clés API</TabsTrigger>
            <TabsTrigger value="int">Intégrations</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              {
                r: "Administrateur",
                d: "Accès complet, gestion des utilisateurs et de la sécurité.",
                u: 4,
                p: ["Tous droits"],
              },
              {
                r: "Manager",
                d: "Vision exécutive, exports et supervision.",
                u: 8,
                p: ["Lecture", "Exports", "KPIs"],
              },
              {
                r: "Analyste senior",
                d: "Validation IA, escalades et fusion d'incidents.",
                u: 12,
                p: ["Analyse", "Validation", "Fusion"],
              },
              {
                r: "Analyste",
                d: "Traitement des alertes assignées.",
                u: 24,
                p: ["Analyse", "Commentaires"],
              },
              {
                r: "Institution",
                d: "Accès aux alertes de sa zone/domaine.",
                u: 6,
                p: ["Lecture ciblée"],
              },
              {
                r: "Citoyen",
                d: "Signalements, suivi, base de connaissances.",
                u: 4821,
                p: ["Signalement", "Suivi"],
              },
            ].map((r) => (
              <Card key={r.r} className="shadow-elev-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[14px] font-semibold">{r.r}</CardTitle>
                    <Badge variant="secondary">{r.u} membres</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[12.5px] text-muted-foreground">{r.d}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.p.map((x) => (
                      <Badge key={x} variant="outline" className="text-[11px]">
                        {x}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="cats" className="mt-4 space-y-4">
            <Card className="shadow-elev-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[13.5px]">Catégories d'alertes</CardTitle>
                <Button size="sm" className="h-8 gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Ajouter
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Incitation à la violence",
                  "Désinformation",
                  "Harcèlement",
                  "Escroquerie",
                  "Discours de haine",
                  "Protection de l'enfance",
                  "Atteintes sexuelles",
                  "Cybercriminalité",
                ].map((c) => (
                  <div key={c} className="rounded-md border border-border p-3">
                    <div className="text-[12.5px] font-medium">{c}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">12 mots-clés</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="shadow-elev-1">
              <CardHeader>
                <CardTitle className="text-[13.5px] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> Moteur d'analyse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-[12.5px]">Seuil "Critique"</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Slider defaultValue={[85]} max={100} className="flex-1" />
                    <span className="text-[13px] tabular-nums font-semibold w-10 text-right">
                      85
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-[12.5px]">Seuil "Élevé"</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Slider defaultValue={[65]} max={100} className="flex-1" />
                    <span className="text-[13px] tabular-nums font-semibold w-10 text-right">
                      65
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[12.5px]">Escalade automatique BSC</Label>
                    <div className="text-[11px] text-muted-foreground">
                      Notifie la brigade au-delà du seuil critique
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[12.5px]">Validation humaine obligatoire</Label>
                    <div className="text-[11px] text-muted-foreground">
                      Avant fermeture d'une alerte critique
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elev-1">
              <CardHeader>
                <CardTitle className="text-[13.5px]">Modèles actifs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-[12.5px]">
                {[
                  { n: "asimba-lang-detect", v: "v2.1", s: "opérationnel" },
                  { n: "asimba-sentiment-fr", v: "v3.0", s: "opérationnel" },
                  { n: "asimba-violence-clf", v: "v3.2", s: "opérationnel" },
                  { n: "asimba-disinfo-clf", v: "v2.4", s: "opérationnel" },
                  { n: "asimba-child-safety", v: "v1.9", s: "opérationnel" },
                  { n: "asimba-propagation", v: "v1.1", s: "expérimental" },
                ].map((m) => (
                  <div
                    key={m.n}
                    className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                  >
                    <div>
                      <div className="font-mono text-[12px]">{m.n}</div>
                      <div className="text-[11px] text-muted-foreground">{m.v}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        m.s === "opérationnel"
                          ? "text-success border-success/30"
                          : "text-warning border-warning/30"
                      }
                    >
                      {m.s}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="mt-4 space-y-4">
            <Card className="shadow-elev-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[13.5px] flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-primary" /> Clés API
                </CardTitle>
                <Button size="sm" className="h-8 gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Générer une clé
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    n: "Intégration ANTIC",
                    k: "asmb_live_9f42a8_••••••••••••dc21",
                    d: "07/03/2026",
                  },
                  { n: "Intégration BSC", k: "asmb_live_2a91b7_••••••••••••ef88", d: "12/04/2026" },
                  { n: "Webhook MINCOM", k: "asmb_live_71c334_••••••••••••ab04", d: "22/05/2026" },
                ].map((k) => (
                  <div
                    key={k.n}
                    className="flex items-center justify-between rounded-md border border-border p-3"
                  >
                    <div>
                      <div className="text-[12.5px] font-medium">{k.n}</div>
                      <div className="mt-0.5 font-mono text-[11.5px] text-muted-foreground">
                        {k.k}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      Créée le {k.d}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="int"
            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { n: "Facebook Graph API", s: true, d: "Ingestion contenus publics" },
              { n: "TikTok Research API", s: true, d: "Ingestion publications" },
              { n: "X (Twitter) API v2", s: true, d: "Streaming filtré" },
              { n: "WhatsApp Business", s: false, d: "Réception signalements dédiés" },
              { n: "SMS Gateway MTN", s: true, d: "Notifications SMS" },
              { n: "Email SMTP sécurisé", s: true, d: "Notifications transactionnelles" },
            ].map((i) => (
              <Card key={i.n} className="shadow-elev-1">
                <CardContent className="p-4 flex items-start justify-between gap-2">
                  <div className="flex gap-3 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                      <Plug className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold truncate">{i.n}</div>
                      <div className="text-[11.5px] text-muted-foreground">{i.d}</div>
                    </div>
                  </div>
                  <Switch defaultChecked={i.s} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card className="shadow-elev-1">
          <CardHeader>
            <CardTitle className="text-[13.5px] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
            <div className="flex items-center justify-between">
              <span>Chiffrement au repos (AES-256)</span>
              <Badge variant="outline" className="text-success border-success/30">
                Actif
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>2FA obligatoire (admins)</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Journalisation OWASP</span>
              <Badge variant="outline" className="text-success border-success/30">
                Actif
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
