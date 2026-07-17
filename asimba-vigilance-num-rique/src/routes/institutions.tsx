import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users2, Plus } from "lucide-react";
import { institutions } from "@/lib/mock-data";

export const Route = createFileRoute("/institutions")({
  head: () => ({
    meta: [
      { title: "Institutions partenaires — ASIMBA" },
      { name: "description", content: "Institutions publiques et privées partenaires d'ASIMBA." },
    ],
  }),
  component: InstitutionsPage,
});

function InstitutionsPage() {
  return (
    <AppLayout title="Institutions" subtitle={`${institutions.length} partenaires`}>
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Écosystème partenaires"
          title="Institutions connectées"
          description="Ministères, agences, ONG et universités raccordés à la plateforme."
          actions={<Button className="h-9 gap-1.5"><Plus className="h-3.5 w-3.5" /> Nouvelle institution</Button>}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institutions.map((inst) => (
            <Card key={inst.sigle} className="shadow-elev-1 hover:shadow-elev-2 transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-[13px]">
                    {inst.sigle.slice(0, 3)}
                  </div>
                  <Badge variant="outline" className={inst.statut === "actif" ? "text-success border-success/30 bg-success/5" : "text-muted-foreground"}>
                    {inst.statut === "actif" ? "Actif" : "Invité"}
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="text-[13.5px] font-semibold leading-tight">{inst.nom}</div>
                  <div className="mt-0.5 text-[11.5px] font-mono text-muted-foreground">{inst.sigle}</div>
                </div>
                <div className="mt-2 text-[12px] text-muted-foreground">{inst.role}</div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    <Users2 className="h-3.5 w-3.5" /> {inst.utilisateurs} utilisateurs
                  </div>
                  <button className="text-[12px] font-medium text-primary hover:underline">Gérer</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
