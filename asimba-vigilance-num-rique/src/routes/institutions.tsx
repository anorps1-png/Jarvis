import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users2, Plus } from "lucide-react";
import { useInstitutions } from "@/lib/queries/staff";
import type { Database } from "@/integrations/supabase/types";

type Institution = Database["public"]["Tables"]["institutions"]["Row"];

export const Route = createFileRoute("/institutions")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Institutions partenaires — ASIMBA" },
      { name: "description", content: "Institutions publiques et privées partenaires d'ASIMBA." },
    ],
  }),
  component: InstitutionsPage,
});

const roleLabels: Record<Institution["role"], string> = {
  partenaire: "Partenaire",
  regulateur: "Régulateur",
  media: "Média",
  gouvernemental: "Gouvernemental",
  ong: "ONG",
};

function InstitutionsPage() {
  const { data: institutions, isLoading } = useInstitutions();

  const institutionCount = institutions?.length || 0;

  return (
    <AppLayout
      title="Institutions"
      subtitle={`${institutionCount} partenaire${institutionCount !== 1 ? "s" : ""}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Écosystème partenaires"
          title="Institutions connectées"
          description="Ministères, agences, ONG et universités raccordés à la plateforme."
          actions={
            <Button className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Nouvelle institution
            </Button>
          }
        />
        {isLoading ? (
          <div className="text-center text-muted-foreground py-8">Chargement...</div>
        ) : !institutions || institutions.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">Aucune institution</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {institutions.map((inst: Institution) => (
              <Card key={inst.id} className="shadow-elev-1 hover:shadow-elev-2 transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-[13px]">
                      {inst.sigle.slice(0, 3)}
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        inst.statut === "actif"
                          ? "text-success border-success/30 bg-success/5"
                          : "text-muted-foreground"
                      }
                    >
                      {inst.statut === "actif" ? "Actif" : "Suspendu"}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="text-[13.5px] font-semibold leading-tight">{inst.nom}</div>
                    <div className="mt-0.5 text-[11.5px] font-mono text-muted-foreground">
                      {inst.sigle}
                    </div>
                  </div>
                  <div className="mt-2 text-[12px] text-muted-foreground">
                    {roleLabels[inst.role]}
                  </div>
                  {inst.description && (
                    <div className="mt-2 text-[11.5px] text-muted-foreground">
                      {inst.description}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                      <Users2 className="h-3.5 w-3.5" /> Affiliés
                    </div>
                    <button className="text-[12px] font-medium text-primary hover:underline">
                      Gérer
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
