import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, HelpCircle, Shield, ChevronRight, Search } from "lucide-react";
import { articles } from "@/lib/mock-data";

export const Route = createFileRoute("/connaissances")({
  head: () => ({
    meta: [
      { title: "Base documentaire — ASIMBA" },
      { name: "description", content: "Articles, guides et vidéos de sensibilisation à la citoyenneté numérique." },
    ],
  }),
  component: KnowledgePage,
});

const faq = [
  { q: "Comment ASIMBA garantit-il ma confidentialité ?", r: "Nous n'accédons jamais à vos messages privés. Les signalements peuvent être totalement anonymes." },
  { q: "Que devient mon signalement ?", r: "Il est analysé par notre moteur d'IA puis validé par un analyste humain avant transmission éventuelle aux autorités compétentes." },
  { q: "Puis-je suivre l'avancement d'un signalement ?", r: "Oui, si vous choisissez le mode « identifié » ou « restreint » et fournissez un email de contact." },
  { q: "ASIMBA est-il utilisé pour surveiller les citoyens ?", r: "Non. ASIMBA ne traite que des informations publiques ou volontairement partagées." },
];

function KnowledgePage() {
  return (
    <AppLayout title="Base documentaire" subtitle="Ressources et sensibilisation">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Centre de connaissances"
          title="Sensibilisation & citoyenneté numérique"
          description="Guides, articles, vidéos et bonnes pratiques pour comprendre, prévenir et signaler les menaces numériques."
        />

        <Card className="shadow-elev-1 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un article, un guide, une vidéo…" className="h-11 pl-9" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
            {["Cybersécurité", "Citoyenneté numérique", "Éducation aux médias", "Protection de l'enfance", "Fact-checking"].map((t) => (
              <button key={t} className="rounded-full border border-border bg-card px-3 py-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                {t}
              </button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => {
            const icons = [BookOpen, Shield, Video];
            const Icon = icons[i % icons.length];
            return (
              <Card key={a.id} className="shadow-elev-1 group cursor-pointer hover:shadow-elev-2 transition-shadow">
                <div className="h-32 relative bg-gradient-to-br from-primary/10 via-primary/5 to-info/10 border-b border-border rounded-t-xl flex items-center justify-center">
                  <Icon className="h-10 w-10 text-primary/60" />
                  <Badge className="absolute top-3 left-3 bg-card text-foreground border-border" variant="outline">
                    {a.categorie}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">Lecture · {a.duree}</div>
                  <div className="mt-1 text-[14px] font-semibold group-hover:text-primary transition-colors">{a.titre}</div>
                  <p className="mt-1.5 text-[12px] text-muted-foreground line-clamp-2">{a.resume}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-primary">
                    Lire l'article <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-elev-1">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold">
              <HelpCircle className="h-4 w-4 text-primary" /> Questions fréquentes
            </div>
          </div>
          <div className="divide-y divide-border">
            {faq.map((q, i) => (
              <details key={i} className="group px-5 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between text-[13px] font-medium">
                  {q.q}
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-2 text-[12.5px] text-muted-foreground">{q.r}</p>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
