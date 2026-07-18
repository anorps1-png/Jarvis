import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { utilisateurs } from "@/lib/mock-data";

export const Route = createFileRoute("/utilisateurs")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Utilisateurs — ASIMBA" },
      { name: "description", content: "Gestion des comptes utilisateurs, rôles et permissions." },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  return (
    <AppLayout title="Utilisateurs" subtitle={`${utilisateurs.length} comptes actifs`}>
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8 space-y-5">
        <PageHeader
          eyebrow="Administration"
          title="Gestion des utilisateurs"
          description="Créez et gérez les comptes, attribuez des rôles et des permissions granulaires."
          actions={
            <Button className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Nouvel utilisateur
            </Button>
          }
        />
        <Card className="shadow-elev-1">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher…" className="h-9 pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox />
                </TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utilisateurs.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {u.nom
                            .split(" ")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-[12.5px] font-medium">{u.nom}</div>
                        <div className="text-[11px] text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[11px]">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[12px] text-muted-foreground">
                    {u.institution}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium ${u.statut === "actif" ? "text-success" : "text-destructive"}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${u.statut === "actif" ? "bg-success" : "bg-destructive"}`}
                      />
                      {u.statut === "actif" ? "Actif" : "Suspendu"}
                    </span>
                  </TableCell>
                  <TableCell className="text-[11.5px] text-muted-foreground">
                    {u.derniere}
                  </TableCell>
                  <TableCell>
                    <button className="p-1 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}
