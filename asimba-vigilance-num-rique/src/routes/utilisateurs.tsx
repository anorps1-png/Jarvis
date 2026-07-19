import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
import { useUtilisateurs } from "@/lib/queries/staff";

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

const roleColors: Record<string, string> = {
  admin: "text-destructive border-destructive/30 bg-destructive/5",
  staff: "text-blue-600 border-blue-200 bg-blue-50",
  analyst: "text-purple-600 border-purple-200 bg-purple-50",
  user: "text-muted-foreground",
};

function UsersPage() {
  const { data: utilisateurs, isLoading } = useUtilisateurs();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!utilisateurs) return [];
    const lower = searchTerm.toLowerCase();
    return utilisateurs.filter(
      (u) =>
        (u.full_name?.toLowerCase() || "").includes(lower) ||
        u.institutions?.nom.toLowerCase().includes(lower) ||
        u.role.toLowerCase().includes(lower),
    );
  }, [utilisateurs, searchTerm]);

  const count = utilisateurs?.length || 0;

  return (
    <AppLayout title="Utilisateurs" subtitle={`${count} comptes`}>
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
              <Input
                placeholder="Rechercher…"
                className="h-9 pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Chargement...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">Aucun utilisateur</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.user_id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                            {(u.full_name || "U")
                              .split(" ")
                              .map((s) => s[0])
                              .slice(0, 2)
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-[12.5px] font-medium">{u.full_name || "—"}</div>
                          <div className="text-[11px] text-muted-foreground">{u.user_id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[11px] ${roleColors[u.role] || "text-muted-foreground"}`}
                      >
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[12px] text-muted-foreground">
                      {u.institutions?.nom || "—"}
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
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
