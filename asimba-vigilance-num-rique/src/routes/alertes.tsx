import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, PageHeader, SeverityBadge, StatusPill } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Filter, Search, SlidersHorizontal } from "lucide-react";
import { alerts, formatDateTime } from "@/lib/mock-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Route = createFileRoute("/alertes")({
  head: () => ({
    meta: [
      { title: "Alertes — ASIMBA" },
      { name: "description", content: "Toutes les alertes détectées par le moteur d'analyse ASIMBA." },
    ],
  }),
  component: AlertesPage,
});

function AlertesPage() {
  return (
    <AppLayout
      title="Alertes"
      subtitle={`${alerts.length} alertes · mise à jour en temps réel`}
      actions={
        <>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Download className="h-3.5 w-3.5" /> Exporter
          </Button>
          <Button size="sm" className="h-9">Nouvelle règle</Button>
        </>
      }
    >
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8 space-y-5">
        <PageHeader
          eyebrow="Centre d'alertes"
          title="Alertes détectées"
          description="Toutes les alertes générées automatiquement par le moteur d'analyse ASIMBA à partir des signalements et sources publiques."
        />

        <Card className="shadow-elev-1">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher une alerte, un mot-clé, une référence…" className="h-9 pl-8 text-[12.5px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[150px] text-[12px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="critique">Critique</SelectItem>
                <SelectItem value="eleve">Élevé</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="faible">Faible</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[150px] text-[12px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes plateformes</SelectItem>
                <SelectItem value="fb">Facebook</SelectItem>
                <SelectItem value="wa">WhatsApp</SelectItem>
                <SelectItem value="tt">TikTok</SelectItem>
                <SelectItem value="x">X (Twitter)</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[150px] text-[12px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes régions</SelectItem>
                <SelectItem value="centre">Centre</SelectItem>
                <SelectItem value="littoral">Littoral</SelectItem>
                <SelectItem value="ouest">Ouest</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5" /> Filtres avancés</Button>
            <Button variant="ghost" size="sm" className="h-9 gap-1.5 text-muted-foreground"><Filter className="h-3.5 w-3.5" /> Réinitialiser</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10"><Checkbox /></TableHead>
                  <TableHead className="w-[130px]">Référence</TableHead>
                  <TableHead className="w-[110px]">Niveau</TableHead>
                  <TableHead>Contenu</TableHead>
                  <TableHead className="w-[110px]">Source</TableHead>
                  <TableHead className="w-[150px]">Localisation</TableHead>
                  <TableHead className="w-[140px]">Détecté le</TableHead>
                  <TableHead className="w-[80px] text-right">Score</TableHead>
                  <TableHead className="w-[110px]">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer">
                    <TableCell><Checkbox /></TableCell>
                    <TableCell><span className="font-mono text-[11.5px] text-muted-foreground">{a.reference}</span></TableCell>
                    <TableCell><SeverityBadge level={a.severite} /></TableCell>
                    <TableCell>
                      <Link to="/alertes" className="block max-w-[420px] truncate text-[12.5px] font-medium text-foreground hover:text-primary">
                        {a.titre}
                      </Link>
                      <div className="mt-0.5 max-w-[420px] truncate text-[11px] text-muted-foreground">{a.categorie}</div>
                    </TableCell>
                    <TableCell className="text-[12px] text-foreground">{a.source}</TableCell>
                    <TableCell className="text-[12px] text-muted-foreground">{a.ville}, {a.region}</TableCell>
                    <TableCell className="font-mono text-[11.5px] text-muted-foreground">{formatDateTime(a.detecte)}</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-[13px]">{a.score}</TableCell>
                    <TableCell><StatusPill status={a.statut} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-[12px] text-muted-foreground">
            <div>Affichage de <span className="font-medium text-foreground">1–24</span> sur <span className="font-medium text-foreground">1 284</span> alertes</div>
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">…</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">54</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
