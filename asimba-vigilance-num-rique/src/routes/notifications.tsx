import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [{ title: "Notifications — ASIMBA" }, { name: "description", content: "Historique et préférences de notification." }],
  }),
  component: NotifPage,
});

function NotifPage() {
  return (
    <AppLayout title="Notifications" subtitle="Historique complet">
      <div className="mx-auto max-w-[1000px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Centre de notifications"
          title="Toutes vos notifications"
          description="Alertes système, assignations, décisions IA et messages des partenaires."
          actions={<Button variant="outline" size="sm" className="h-9">Tout marquer comme lu</Button>}
        />
        <Card className="shadow-elev-1 divide-y divide-border">
          {[...notifications, ...notifications].map((n, i) => (
            <div key={i} className={cn("flex gap-3 p-4 hover:bg-muted/40", !n.lu && "bg-accent/20")}>
              <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.type === "critique" ? "bg-destructive" : "bg-primary")} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-medium truncate">{n.titre}</div>
                  <div className="text-[11px] text-muted-foreground shrink-0">{n.horodatage}</div>
                </div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{n.corps}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
}
