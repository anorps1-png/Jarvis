import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/parametres")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({ meta: [{ title: "Paramètres — ASIMBA" }, { name: "description", content: "Préférences du compte, sécurité et notifications." }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppLayout title="Paramètres" subtitle="Compte et préférences">
      <div className="mx-auto max-w-[1000px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader eyebrow="Mon compte" title="Paramètres" description="Gérez vos informations personnelles, la sécurité et les préférences de notification." />

        <Card className="shadow-elev-1">
          <CardHeader><CardTitle className="text-[13.5px]">Profil</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-primary-foreground text-[16px]">AG</AvatarFallback></Avatar>
              <div>
                <Button size="sm" variant="outline">Changer la photo</Button>
                <div className="mt-1 text-[11px] text-muted-foreground">PNG/JPG · 2 Mo max</div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nom complet" defaultValue="Armel Guyot" />
              <Field label="Adresse email" defaultValue="armel.guyot@asimba.cm" />
              <Field label="Téléphone" defaultValue="+237 6 90 12 34 56" />
              <Field label="Fonction" defaultValue="Administrateur plateforme" />
              <Field label="Institution" defaultValue="ANTIC" />
              <Field label="Langue" defaultValue="Français (Cameroun)" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Annuler</Button>
              <Button>Enregistrer</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elev-1">
          <CardHeader><CardTitle className="text-[13.5px]">Sécurité</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <SwitchRow label="Authentification à deux facteurs" hint="Recommandé pour les administrateurs" defaultChecked />
            <SwitchRow label="Notifications de connexion" hint="Recevoir un email à chaque nouvelle connexion" defaultChecked />
            <SwitchRow label="Verrouillage automatique de session" hint="Après 15 minutes d'inactivité" defaultChecked />
            <Separator />
            <Button variant="outline">Changer le mot de passe</Button>
          </CardContent>
        </Card>

        <Card className="shadow-elev-1">
          <CardHeader><CardTitle className="text-[13.5px]">Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <SwitchRow label="Email — alertes critiques" defaultChecked />
            <SwitchRow label="Email — rapports hebdomadaires" defaultChecked />
            <SwitchRow label="SMS — alertes critiques" defaultChecked />
            <SwitchRow label="Push navigateur — assignations" defaultChecked />
            <SwitchRow label="Push navigateur — commentaires" />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <Label className="text-[12px] mb-1.5 block">{label}</Label>
      <Input defaultValue={defaultValue} className="h-10" />
    </div>
  );
}
function SwitchRow({ label, hint, defaultChecked }: { label: string; hint?: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[13px] font-medium">{label}</div>
        {hint && <div className="text-[11.5px] text-muted-foreground">{hint}</div>}
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
