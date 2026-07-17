import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download } from "lucide-react";
import { auditLogs, formatDateTime } from "@/lib/mock-data";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [{ title: "Journal d'audit — ASIMBA" }, { name: "description", content: "Traçabilité complète des actions effectuées sur la plateforme." }],
  }),
  component: AuditPage,
});

function AuditPage() {
  return (
    <AppLayout title="Journal d'audit" subtitle="Traçabilité et conformité">
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8 space-y-5">
        <PageHeader
          eyebrow="Sécurité"
          title="Journal d'audit"
          description="Chaque action sensible est enregistrée, horodatée et signée. Ces journaux sont exportables pour audit externe."
          actions={<Button variant="outline" size="sm" className="h-9 gap-1.5"><Download className="h-3.5 w-3.5" /> Exporter le journal</Button>}
        />
        <Card className="shadow-elev-1">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher action, utilisateur, IP…" className="h-9 pl-8" />
            </div>
            <Select defaultValue="all"><SelectTrigger className="h-9 w-[140px] text-[12px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[170px]">Horodatage</TableHead>
                <TableHead className="w-[110px]">Niveau</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Cible</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead className="w-[140px]">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-[11.5px] text-muted-foreground">{formatDateTime(l.horodatage)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      l.niveau === "critical" ? "text-destructive border-destructive/30 bg-destructive/5"
                      : l.niveau === "warning" ? "text-[color:oklch(0.45_0.15_60)] border-warning/40 bg-warning/10"
                      : "text-muted-foreground"
                    }>
                      {l.niveau}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[12.5px] font-medium">{l.action}</TableCell>
                  <TableCell className="font-mono text-[11.5px] text-muted-foreground">{l.cible}</TableCell>
                  <TableCell className="text-[12px]">{l.utilisateur}</TableCell>
                  <TableCell className="font-mono text-[11.5px] text-muted-foreground">{l.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}
