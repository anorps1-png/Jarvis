import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Download, FileSpreadsheet } from "lucide-react";
import { categoriesData, evolutionSeries, regionsData, sourcesData, topAnalystes } from "@/lib/mock-data";

export const Route = createFileRoute("/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques — ASIMBA" },
      { name: "description", content: "Indicateurs clés, tendances et performances des équipes d'analyse." },
    ],
  }),
  component: StatsPage,
});

const monthlyTrend = [
  { mois: "Jan", alertes: 620, resolues: 540 },
  { mois: "Fév", alertes: 705, resolues: 610 },
  { mois: "Mar", alertes: 812, resolues: 720 },
  { mois: "Avr", alertes: 894, resolues: 780 },
  { mois: "Mai", alertes: 1024, resolues: 890 },
  { mois: "Juin", alertes: 1156, resolues: 1010 },
  { mois: "Juil", alertes: 1284, resolues: 1120 },
];

function StatsPage() {
  return (
    <AppLayout title="Statistiques" subtitle="Analyse comparative et tendances">
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8 space-y-6">
        <PageHeader
          eyebrow="Analytics"
          title="Tableau statistique"
          description="Suivi consolidé des performances opérationnelles, régionales et institutionnelles."
          actions={
            <>
              <Select defaultValue="12">
                <SelectTrigger className="h-9 w-[160px] text-[12.5px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 derniers mois</SelectItem>
                  <SelectItem value="6">6 derniers mois</SelectItem>
                  <SelectItem value="12">12 derniers mois</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9 gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" /> CSV</Button>
              <Button size="sm" className="h-9 gap-1.5"><Download className="h-3.5 w-3.5" /> PDF</Button>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="shadow-elev-1 lg:col-span-2">
            <CardHeader><CardTitle className="text-[13.5px] font-semibold">Alertes vs Résolutions (12 mois)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="mois" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Area type="monotone" dataKey="alertes" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" name="Alertes détectées" />
                    <Area type="monotone" dataKey="resolues" stroke="var(--color-success)" strokeWidth={2} fill="url(#g2)" name="Résolues" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elev-1">
            <CardHeader><CardTitle className="text-[13.5px] font-semibold">Catégories</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoriesData} dataKey="part" nameKey="nom" innerRadius={60} outerRadius={100} paddingAngle={2}>
                      {categoriesData.map((_, i) => (
                        <Cell key={i} fill={`var(--color-chart-${(i % 5) + 1})`} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {categoriesData.map((c, i) => (
                  <div key={c.nom} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: `var(--color-chart-${(i % 5) + 1})` }} />
                    <span className="truncate">{c.nom}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="shadow-elev-1 lg:col-span-2">
            <CardHeader><CardTitle className="text-[13.5px] font-semibold">Comparaison régionale</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionsData} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="region" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-25} textAnchor="end" height={60} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="alertes" radius={[6, 6, 0, 0]} fill="var(--color-primary)" name="Alertes" />
                    <Bar dataKey="critiques" radius={[6, 6, 0, 0]} fill="var(--color-destructive)" name="Critiques" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elev-1">
            <CardHeader><CardTitle className="text-[13.5px] font-semibold">Performances analystes</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {topAnalystes.map((a) => (
                <div key={a.nom} className="flex items-center justify-between text-[12.5px]">
                  <div>
                    <div className="font-medium">{a.nom}</div>
                    <div className="text-[10.5px] text-muted-foreground">Temps moyen · {a.moyenne}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold tabular-nums">{a.traites}</div>
                    <div className="text-[10.5px] text-muted-foreground">Score {a.score}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="shadow-elev-1">
            <CardHeader><CardTitle className="text-[13.5px] font-semibold">Répartition plateformes</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={sourcesData} margin={{ top: 8, right: 12, left: 20, bottom: 0 }}>
                    <CartesianGrid stroke="var(--color-border)" horizontal={false} strokeDasharray="3 3" />
                    <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                    <YAxis type="category" dataKey="nom" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={80} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="part" radius={[0, 6, 6, 0]}>
                      {sourcesData.map((s, i) => (
                        <Cell key={i} fill={s.couleur} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elev-1">
            <CardHeader><CardTitle className="text-[13.5px] font-semibold">Tendance hebdomadaire</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolutionSeries} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="jour" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="critiques" stroke="var(--color-destructive)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="elevees" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="moyennes" stroke="var(--color-info)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
