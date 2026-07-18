import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth";
import { AppLayout, PageHeader, SeverityBadge, StatusPill } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  Flame,
  Plus,
  ShieldAlert,
  Sparkles,
  Activity,
} from "lucide-react";
import {
  alerts,
  categoriesData,
  evolutionSeries,
  formatTime,
  kpis,
  regionsData,
  sourcesData,
  topAnalystes,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Tableau de bord — ASIMBA" },
      {
        name: "description",
        content: "Vue d'ensemble opérationnelle des risques numériques détectés au Cameroun.",
      },
    ],
  }),
  component: DashboardPage,
});

function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
  hint,
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "danger" | "warning" | "success" | "info";
  hint?: string;
}) {
  const toneMap = {
    default: "bg-muted text-foreground",
    danger: "bg-destructive/10 text-destructive",
    warning: "bg-warning/15 text-[color:oklch(0.45_0.15_60)]",
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
  } as const;
  return (
    <Card className="shadow-elev-1 hover:shadow-elev-2 transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11.5px] font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </div>
            <div className="mt-1.5 text-[26px] font-semibold tabular-nums tracking-tight text-foreground">
              {value}
            </div>
          </div>
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-md", toneMap[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11.5px]">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                delta >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {delta >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(delta)}%
            </span>
          )}
          <span className="text-muted-foreground">{hint ?? "vs semaine précédente"}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("shadow-elev-1", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[13.5px] font-semibold">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function DashboardPage() {
  const critiques = alerts.filter((a) => a.severite === "critique").slice(0, 5);
  const recent = alerts.slice(0, 6);

  return (
    <AppLayout
      title="Tableau de bord"
      subtitle="Vue opérationnelle · Toutes institutions"
      actions={
        <>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Download className="h-3.5 w-3.5" /> Exporter
          </Button>
          <Button size="sm" className="h-9 gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Nouveau signalement
          </Button>
        </>
      }
    >
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Centre opérationnel"
          title="Bienvenue, Armel"
          description="128 alertes traitées cette semaine · 23 critiques nécessitent votre attention immédiate."
          actions={
            <>
              <Select defaultValue="7">
                <SelectTrigger className="h-9 w-[180px] text-[12.5px]">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dernières 24 h</SelectItem>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                  <SelectItem value="90">90 derniers jours</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[180px] text-[12.5px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les partenaires</SelectItem>
                  <SelectItem value="antic">ANTIC</SelectItem>
                  <SelectItem value="bsc">BSC — Cybercriminalité</SelectItem>
                  <SelectItem value="mincom">MINCOM</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          <KpiCard
            label="Alertes totales"
            value={kpis.alertesTotales.toLocaleString("fr-FR")}
            delta={kpis.alertesTotalesDelta}
            icon={FileText}
          />
          <KpiCard
            label="Critiques"
            value={kpis.critiques}
            delta={kpis.critiquesDelta}
            icon={Flame}
            tone="danger"
          />
          <KpiCard
            label="En cours"
            value={kpis.enCours}
            delta={kpis.enCoursDelta}
            icon={Clock}
            tone="warning"
          />
          <KpiCard
            label="Résolues"
            value={kpis.resolues}
            delta={kpis.resoluesDelta}
            icon={CheckCircle2}
            tone="success"
          />
          <KpiCard
            label="Temps moyen"
            value={kpis.tempsMoyen}
            delta={kpis.tempsMoyenDelta}
            icon={Activity}
            tone="info"
            hint="temps de traitement"
          />
          <KpiCard
            label="Confiance IA"
            value={`${kpis.confianceIA}%`}
            icon={Sparkles}
            tone="info"
            hint="moyenne 7j"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartCard
            title="Évolution des alertes"
            className="lg:col-span-2"
            action={
              <Select defaultValue="7">
                <SelectTrigger className="h-8 w-[140px] text-[11.5px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={evolutionSeries}
                  margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--color-border)"
                    vertical={false}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="jour"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="critiques"
                    stroke="var(--color-destructive)"
                    strokeWidth={2}
                    dot={false}
                    name="Critiques"
                  />
                  <Line
                    type="monotone"
                    dataKey="elevees"
                    stroke="var(--color-warning)"
                    strokeWidth={2}
                    dot={false}
                    name="Élevées"
                  />
                  <Line
                    type="monotone"
                    dataKey="moyennes"
                    stroke="var(--color-info)"
                    strokeWidth={2}
                    dot={false}
                    name="Moyennes"
                  />
                  <Line
                    type="monotone"
                    dataKey="faibles"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth={2}
                    dot={false}
                    name="Faibles"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-[11.5px] text-muted-foreground">
              <LegendDot color="var(--color-destructive)" label="Critiques" />
              <LegendDot color="var(--color-warning)" label="Élevées" />
              <LegendDot color="var(--color-info)" label="Moyennes" />
              <LegendDot color="var(--color-muted-foreground)" label="Faibles" />
            </div>
          </ChartCard>

          <ChartCard title="Sources principales">
            <div className="flex items-center gap-4">
              <div className="h-[180px] w-[180px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourcesData}
                      dataKey="part"
                      nameKey="nom"
                      innerRadius={48}
                      outerRadius={78}
                      paddingAngle={2}
                    >
                      {sourcesData.map((s, i) => (
                        <Cell key={i} fill={s.couleur} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {sourcesData.map((s) => (
                  <div key={s.nom} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.couleur }} />
                      <span className="text-foreground">{s.nom}</span>
                    </div>
                    <span className="font-medium tabular-nums text-muted-foreground">
                      {s.part}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartCard title="Catégories les plus signalées" className="lg:col-span-2">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoriesData}
                  margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--color-border)"
                    vertical={false}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="nom"
                    stroke="var(--color-muted-foreground)"
                    fontSize={10.5}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="part" radius={[6, 6, 0, 0]} fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Répartition régionale">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={regionsData.slice(0, 8)}
                  margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--color-border)"
                    vertical={false}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="region"
                    stroke="var(--color-muted-foreground)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="alertes"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fill="url(#grad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="shadow-elev-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[13.5px] font-semibold">
                Alertes critiques récentes
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-[12px]">
                <Filter className="h-3.5 w-3.5" /> Filtres
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {critiques.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-destructive/10">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {a.reference}
                        </span>
                        <SeverityBadge level={a.severite} />
                        <StatusPill status={a.statut} />
                      </div>
                      <div className="mt-1 text-[13px] font-medium text-foreground truncate">
                        {a.titre}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] text-muted-foreground">
                        <span>{a.source}</span>
                        <span>·</span>
                        <span>
                          {a.ville}, {a.region}
                        </span>
                        <span>·</span>
                        <span>Détecté à {formatTime(a.detecte)}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-1">
                      <div className="text-[10.5px] font-semibold tracking-wider text-muted-foreground uppercase">
                        Score
                      </div>
                      <div className="text-[16px] font-semibold tabular-nums text-destructive">
                        {a.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elev-1">
            <CardHeader>
              <CardTitle className="text-[13.5px] font-semibold">
                Analystes les plus actifs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {topAnalystes.map((a, i) => (
                <div key={a.nom} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[12px] font-semibold text-primary">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="font-medium truncate">{a.nom}</span>
                      <span className="tabular-nums text-muted-foreground">{a.traites}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress value={a.score} className="h-1.5" />
                      <span className="text-[10.5px] tabular-nums text-muted-foreground">
                        {a.score}%
                      </span>
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-muted-foreground">
                      Temps moyen · {a.moyenne}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="shadow-elev-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-[13.5px] font-semibold">Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recent.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="min-w-0 flex-1 text-[12.5px]">
                      <span className="font-medium text-foreground">Nouvelle alerte</span>{" "}
                      <span className="text-muted-foreground">{a.titre}</span>
                    </div>
                    <span className="hidden md:inline text-[11px] text-muted-foreground">
                      {a.source} · {a.ville}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatTime(a.detecte)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elev-1">
            <CardHeader>
              <CardTitle className="text-[13.5px] font-semibold">État du système</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <SystemRow label="Ingestion des signalements" status="Opérationnel" tone="success" />
              <SystemRow label="Moteur d'analyse IA" status="Opérationnel" tone="success" />
              <SystemRow label="Détection multilingue" status="Opérationnel" tone="success" />
              <SystemRow label="API partenaires" status="Latence élevée" tone="warning" />
              <SystemRow label="Notifications SMS" status="Opérationnel" tone="success" />
              <div className="mt-4 rounded-md border border-border bg-muted/40 p-3">
                <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
                  <ShieldAlert className="h-3.5 w-3.5 text-primary" />
                  Dernier audit sécurité : il y a 2 jours
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-4 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

function SystemRow({
  label,
  status,
  tone,
}: {
  label: string;
  status: string;
  tone: "success" | "warning" | "danger";
}) {
  const toneMap = {
    success: "bg-success text-success",
    warning: "bg-warning text-[color:oklch(0.45_0.15_60)]",
    danger: "bg-destructive text-destructive",
  } as const;
  const bg = { success: "bg-success/10", warning: "bg-warning/15", danger: "bg-destructive/10" }[
    tone
  ];
  return (
    <div className="flex items-center justify-between text-[12.5px]">
      <span className="text-foreground">{label}</span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium",
          bg,
          toneMap[tone].split(" ")[1],
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", toneMap[tone].split(" ")[0])} />
        {status}
      </span>
    </div>
  );
}
