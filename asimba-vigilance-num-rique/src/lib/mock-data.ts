// Données fictives réalistes pour ASIMBA (contexte camerounais)

export type Severity = "critique" | "eleve" | "moyen" | "faible";
export type AlertStatus = "nouveau" | "en_cours" | "assigne" | "resolu" | "clos";
export type Category =
  | "Incitation à la violence"
  | "Désinformation"
  | "Harcèlement"
  | "Escroquerie"
  | "Atteintes sexuelles"
  | "Discours de haine"
  | "Protection de l'enfance";

export type Platform = "Facebook" | "TikTok" | "WhatsApp" | "X (Twitter)" | "YouTube" | "Autres";

export const regions = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest",
];

export const villes: Record<string, { lat: number; lng: number; region: string }> = {
  Yaoundé: { lat: 3.848, lng: 11.502, region: "Centre" },
  Douala: { lat: 4.051, lng: 9.768, region: "Littoral" },
  Bafoussam: { lat: 5.478, lng: 10.417, region: "Ouest" },
  Bamenda: { lat: 5.959, lng: 10.146, region: "Nord-Ouest" },
  Garoua: { lat: 9.302, lng: 13.397, region: "Nord" },
  Maroua: { lat: 10.591, lng: 14.316, region: "Extrême-Nord" },
  Ngaoundéré: { lat: 7.317, lng: 13.583, region: "Adamaoua" },
  Bertoua: { lat: 4.577, lng: 13.685, region: "Est" },
  Ebolowa: { lat: 2.9, lng: 11.15, region: "Sud" },
  Buéa: { lat: 4.155, lng: 9.231, region: "Sud-Ouest" },
  Kribi: { lat: 2.947, lng: 9.907, region: "Sud" },
  Limbé: { lat: 4.023, lng: 9.196, region: "Sud-Ouest" },
};

export interface Alert {
  id: string;
  reference: string;
  titre: string;
  extrait: string;
  categorie: Category;
  severite: Severity;
  score: number;
  confiance: number;
  statut: AlertStatus;
  source: Platform;
  langue: "Français" | "Anglais" | "Camfranglais" | "Pidgin";
  ville: string;
  region: string;
  detecte: string; // ISO
  motsCles: string[];
  propagation: "très rapide" | "rapide" | "modérée" | "lente";
  analyste?: string;
  resume: string;
  recommandation: string;
}

const analystes = [
  "N. Mbarga",
  "S. Ekambi",
  "A. Nkoulou",
  "F. Tchoumi",
  "L. Bakari",
  "P. Kouam",
  "R. Ngono",
];

const titres: Array<Omit<Alert, "id" | "reference" | "detecte" | "analyste">> = [
  {
    titre: "Appel à attaquer un quartier ce soir à Douala",
    extrait:
      "Le contenu appelle explicitement à s'en prendre à un groupe de personnes dans le quartier cité. Plusieurs expressions de violence détectées.",
    categorie: "Incitation à la violence",
    severite: "critique",
    score: 92,
    confiance: 96,
    statut: "nouveau",
    source: "Facebook",
    langue: "Français",
    ville: "Douala",
    region: "Littoral",
    motsCles: ["attaquer", "tuer", "vengeance", "quartier", "groupe"],
    propagation: "très rapide",
    resume:
      "Publication virale (2 300 partages en 3 h) appelant à des représailles physiques contre une communauté à Bépanda.",
    recommandation:
      "Transmettre immédiatement aux autorités compétentes et déclencher la surveillance de propagation.",
  },
  {
    titre: "Vidéo de désinformation sur une épidémie fictive",
    extrait:
      "Vidéo TikTok affirmant qu'une épidémie mortelle a débuté à Yaoundé. Aucune source officielle ne confirme.",
    categorie: "Désinformation",
    severite: "eleve",
    score: 78,
    confiance: 89,
    statut: "en_cours",
    source: "TikTok",
    langue: "Français",
    ville: "Yaoundé",
    region: "Centre",
    motsCles: ["épidémie", "mort", "hôpital", "gouvernement"],
    propagation: "rapide",
    resume:
      "Contenu générant panique et méfiance envers les autorités sanitaires. 48 000 vues en 12 h.",
    recommandation: "Publier un démenti officiel avec le Ministère de la Santé Publique.",
  },
  {
    titre: "Harcèlement d'une jeune fille en ligne",
    extrait:
      "Fil de commentaires ciblant nommément une lycéenne de 16 ans avec insultes, menaces et divulgation d'informations personnelles.",
    categorie: "Harcèlement",
    severite: "eleve",
    score: 81,
    confiance: 93,
    statut: "assigne",
    source: "Facebook",
    langue: "Français",
    ville: "Bafoussam",
    region: "Ouest",
    motsCles: ["harcèlement", "menaces", "doxxing", "mineure"],
    propagation: "modérée",
    resume:
      "Cyberharcèlement organisé, éléments constitutifs d'atteinte à la vie privée d'une mineure.",
    recommandation:
      "Signaler à la plateforme et transmettre à la Brigade Spéciale de la Cybercriminalité.",
  },
  {
    titre: "Rumeur sur une coupure d'Internet nationale",
    extrait:
      "Message WhatsApp affirmant que le gouvernement coupera Internet pendant 72 h. Aucun communiqué officiel.",
    categorie: "Désinformation",
    severite: "moyen",
    score: 58,
    confiance: 82,
    statut: "en_cours",
    source: "WhatsApp",
    langue: "Français",
    ville: "Yaoundé",
    region: "Centre",
    motsCles: ["coupure", "internet", "gouvernement", "72h"],
    propagation: "rapide",
    resume: "Rumeur diffusée dans plus de 40 groupes WhatsApp signalés.",
    recommandation: "Diffuser un fact-check public via les partenaires média.",
  },
  {
    titre: "Fausse information sur les examens GCE",
    extrait:
      "Publication affirmant que les résultats du GCE ont été annulés. Information démentie par le GCE Board.",
    categorie: "Désinformation",
    severite: "moyen",
    score: 54,
    confiance: 90,
    statut: "nouveau",
    source: "Facebook",
    langue: "Anglais",
    ville: "Buéa",
    region: "Sud-Ouest",
    motsCles: ["GCE", "examens", "annulés", "résultats"],
    propagation: "modérée",
    resume: "Contenu pouvant provoquer de la panique chez les candidats et leurs familles.",
    recommandation: "Coordonner un démenti avec le GCE Board.",
  },
  {
    titre: "Escroquerie à la loterie MTN présumée",
    extrait:
      "SMS et lien signalés par 42 citoyens promettant un gain de 5 000 000 FCFA au nom de MTN Cameroon.",
    categorie: "Escroquerie",
    severite: "eleve",
    score: 74,
    confiance: 95,
    statut: "en_cours",
    source: "WhatsApp",
    langue: "Français",
    ville: "Douala",
    region: "Littoral",
    motsCles: ["loterie", "MTN", "gain", "code", "carte"],
    propagation: "rapide",
    resume: "Campagne d'hameçonnage active visant des utilisateurs mobiles.",
    recommandation: "Alerter MTN Cameroon et les opérateurs pour blocage des numéros émetteurs.",
  },
  {
    titre: "Contenu sensible impliquant un mineur détecté",
    extrait:
      "Image signalée automatiquement par le classifieur de protection de l'enfance. Analyse humaine requise.",
    categorie: "Protection de l'enfance",
    severite: "critique",
    score: 97,
    confiance: 98,
    statut: "assigne",
    source: "X (Twitter)",
    langue: "Français",
    ville: "Yaoundé",
    region: "Centre",
    motsCles: ["mineur", "image", "protection"],
    propagation: "lente",
    resume: "Signalement automatique par le module de protection. Contenu masqué en attente.",
    recommandation: "Escalade immédiate vers la cellule spécialisée et INTERPOL.",
  },
  {
    titre: "Discours de haine ethnique dans un live",
    extrait: "Direct Facebook avec propos ciblant une communauté ethnique. 14 signalements reçus.",
    categorie: "Discours de haine",
    severite: "eleve",
    score: 83,
    confiance: 91,
    statut: "en_cours",
    source: "Facebook",
    langue: "Camfranglais",
    ville: "Bamenda",
    region: "Nord-Ouest",
    motsCles: ["haine", "ethnie", "insultes"],
    propagation: "modérée",
    resume: "Live suivi par 1 200 personnes, éléments haineux répétés.",
    recommandation: "Signalement plateforme + suivi juridique.",
  },
  {
    titre: "Arnaque à l'emploi fictif à l'étranger",
    extrait:
      "Publication promettant des emplois au Canada moyennant frais de dossier. Multiples victimes.",
    categorie: "Escroquerie",
    severite: "moyen",
    score: 61,
    confiance: 88,
    statut: "resolu",
    source: "Facebook",
    langue: "Français",
    ville: "Garoua",
    region: "Nord",
    motsCles: ["emploi", "Canada", "visa", "frais"],
    propagation: "lente",
    resume: "Réseau d'escroquerie identifié, 3 comptes signalés supprimés.",
    recommandation: "Publication d'un guide de prévention.",
  },
  {
    titre: "Fausse alerte inondation à Maroua",
    extrait:
      "Message annonçant l'évacuation immédiate du centre-ville. Aucune confirmation officielle.",
    categorie: "Désinformation",
    severite: "faible",
    score: 34,
    confiance: 76,
    statut: "clos",
    source: "WhatsApp",
    langue: "Français",
    ville: "Maroua",
    region: "Extrême-Nord",
    motsCles: ["inondation", "évacuation", "urgence"],
    propagation: "lente",
    resume: "Rumeur circonscrite après vérification avec la Protection Civile.",
    recommandation: "Aucune action supplémentaire requise.",
  },
];

function pad(n: number, w = 6) {
  return String(n).padStart(w, "0");
}

export const alerts: Alert[] = Array.from({ length: 24 }).map((_, i) => {
  const base = titres[i % titres.length];
  const date = new Date();
  date.setHours(date.getHours() - i * 3 - 2);
  return {
    ...base,
    id: `alert-${i + 1}`,
    reference: `#A-2026-${pad(128 - i)}`,
    detecte: date.toISOString(),
    analyste: i % 3 === 0 ? undefined : analystes[i % analystes.length],
  };
});

export const kpis = {
  alertesTotales: 1284,
  alertesTotalesDelta: 24,
  critiques: 23,
  critiquesDelta: 15,
  enCours: 67,
  enCoursDelta: 10,
  resolues: 384,
  resoluesDelta: 18,
  tempsMoyen: "2 h 14",
  tempsMoyenDelta: -8,
  confianceIA: 91.4,
  signalementsJour: 142,
};

export const evolutionSeries = [
  { jour: "Lun", critiques: 38, elevees: 62, moyennes: 41, faibles: 18 },
  { jour: "Mar", critiques: 45, elevees: 71, moyennes: 48, faibles: 22 },
  { jour: "Mer", critiques: 52, elevees: 68, moyennes: 44, faibles: 20 },
  { jour: "Jeu", critiques: 48, elevees: 74, moyennes: 51, faibles: 25 },
  { jour: "Ven", critiques: 61, elevees: 82, moyennes: 55, faibles: 28 },
  { jour: "Sam", critiques: 57, elevees: 76, moyennes: 49, faibles: 24 },
  { jour: "Dim", critiques: 44, elevees: 65, moyennes: 42, faibles: 21 },
];

export const categoriesData = [
  { nom: "Incitation à la violence", part: 35 },
  { nom: "Désinformation", part: 25 },
  { nom: "Harcèlement", part: 15 },
  { nom: "Escroquerie", part: 10 },
  { nom: "Atteintes sexuelles", part: 8 },
  { nom: "Autres", part: 7 },
];

export const sourcesData = [
  { nom: "Facebook", part: 42, couleur: "var(--color-chart-1)" },
  { nom: "WhatsApp", part: 24, couleur: "var(--color-chart-4)" },
  { nom: "TikTok", part: 18, couleur: "var(--color-chart-2)" },
  { nom: "X (Twitter)", part: 9, couleur: "var(--color-chart-3)" },
  { nom: "Autres", part: 7, couleur: "var(--color-chart-5)" },
];

export const regionsData = regions.map((r, i) => ({
  region: r,
  alertes: 20 + ((i * 37) % 180),
  critiques: 2 + ((i * 11) % 22),
}));

export const topAnalystes = [
  { nom: "N. Mbarga", traites: 128, moyenne: "1 h 42", score: 96 },
  { nom: "S. Ekambi", traites: 114, moyenne: "1 h 58", score: 94 },
  { nom: "A. Nkoulou", traites: 97, moyenne: "2 h 05", score: 92 },
  { nom: "F. Tchoumi", traites: 82, moyenne: "2 h 21", score: 90 },
  { nom: "L. Bakari", traites: 76, moyenne: "2 h 34", score: 88 },
];

export const institutions = [
  {
    nom: "Ministère des Postes et Télécommunications",
    sigle: "MINPOSTEL",
    role: "Régulateur",
    utilisateurs: 12,
    statut: "actif",
  },
  {
    nom: "Agence Nationale des TIC",
    sigle: "ANTIC",
    role: "Cybersécurité",
    utilisateurs: 24,
    statut: "actif",
  },
  {
    nom: "Brigade Spéciale de la Cybercriminalité",
    sigle: "BSC",
    role: "Police judiciaire",
    utilisateurs: 18,
    statut: "actif",
  },
  {
    nom: "Ministère de la Communication",
    sigle: "MINCOM",
    role: "Communication publique",
    utilisateurs: 9,
    statut: "actif",
  },
  {
    nom: "UNICEF Cameroun",
    sigle: "UNICEF",
    role: "Protection de l'enfance",
    utilisateurs: 6,
    statut: "invité",
  },
  {
    nom: "Université de Yaoundé I",
    sigle: "UYI",
    role: "Recherche",
    utilisateurs: 4,
    statut: "actif",
  },
];

export const utilisateurs = [
  {
    nom: "Armel Guyot",
    email: "armel.guyot@asimba.cm",
    role: "Administrateur",
    institution: "ANTIC",
    statut: "actif",
    derniere: "il y a 3 min",
  },
  {
    nom: "Nadège Mbarga",
    email: "n.mbarga@asimba.cm",
    role: "Analyste senior",
    institution: "ANTIC",
    statut: "actif",
    derniere: "il y a 12 min",
  },
  {
    nom: "Serge Ekambi",
    email: "s.ekambi@asimba.cm",
    role: "Analyste",
    institution: "BSC",
    statut: "actif",
    derniere: "il y a 1 h",
  },
  {
    nom: "Aline Nkoulou",
    email: "a.nkoulou@asimba.cm",
    role: "Analyste",
    institution: "MINCOM",
    statut: "actif",
    derniere: "il y a 2 h",
  },
  {
    nom: "Franck Tchoumi",
    email: "f.tchoumi@asimba.cm",
    role: "Analyste",
    institution: "MINPOSTEL",
    statut: "suspendu",
    derniere: "il y a 3 j",
  },
  {
    nom: "Léonie Bakari",
    email: "l.bakari@asimba.cm",
    role: "Manager",
    institution: "UNICEF",
    statut: "actif",
    derniere: "hier",
  },
  {
    nom: "Paul Kouam",
    email: "p.kouam@asimba.cm",
    role: "Manager",
    institution: "MINPOSTEL",
    statut: "actif",
    derniere: "il y a 4 h",
  },
  {
    nom: "Rachelle Ngono",
    email: "r.ngono@asimba.cm",
    role: "Analyste",
    institution: "UYI",
    statut: "actif",
    derniere: "il y a 30 min",
  },
  {
    nom: "Citoyen anonyme #4821",
    email: "—",
    role: "Citoyen",
    institution: "—",
    statut: "actif",
    derniere: "il y a 6 min",
  },
];

export const auditLogs = Array.from({ length: 18 }).map((_, i) => {
  const actions = [
    { action: "Connexion réussie", cible: "session", niveau: "info" },
    { action: "Alerte assignée", cible: "#A-2026-000128", niveau: "info" },
    { action: "Signalement validé", cible: "#A-2026-000124", niveau: "info" },
    { action: "Rôle modifié", cible: "utilisateur:s.ekambi", niveau: "warning" },
    { action: "Tentative de connexion échouée", cible: "session", niveau: "warning" },
    { action: "Clé API générée", cible: "integrations:antic", niveau: "info" },
    { action: "Export PDF", cible: "#A-2026-000119", niveau: "info" },
    { action: "Configuration IA modifiée", cible: "seuil:critique", niveau: "critical" },
  ];
  const a = actions[i % actions.length];
  const d = new Date();
  d.setMinutes(d.getMinutes() - i * 27);
  return {
    id: `log-${i + 1}`,
    horodatage: d.toISOString(),
    utilisateur: utilisateurs[i % utilisateurs.length].nom,
    ...a,
    ip: `196.${20 + (i % 40)}.${10 + ((i * 3) % 240)}.${(i * 17) % 240}`,
  };
});

export const factChecks = [
  {
    id: "fc-1",
    affirmation: "Le gouvernement va couper Internet pendant 72 heures.",
    statut: "faux" as const,
    confiance: 97,
    sources: ["MINPOSTEL - communiqué du 04/07/2026", "ART - déclaration officielle"],
    conclusion:
      "Aucune décision de coupure n'a été prise ni annoncée par le régulateur ou les opérateurs.",
    date: "2026-07-05",
  },
  {
    id: "fc-2",
    affirmation: "Les résultats du GCE 2026 ont été annulés.",
    statut: "faux" as const,
    confiance: 95,
    sources: ["GCE Board - annonce officielle"],
    conclusion: "Les résultats sont maintenus, publication prévue selon le calendrier.",
    date: "2026-07-04",
  },
  {
    id: "fc-3",
    affirmation: "Une épidémie a débuté dans un hôpital de Yaoundé.",
    statut: "trompeur" as const,
    confiance: 84,
    sources: ["MINSANTE", "OMS Cameroun"],
    conclusion:
      "Aucun cluster épidémique n'a été confirmé. Un incident isolé a été mal interprété.",
    date: "2026-07-03",
  },
  {
    id: "fc-4",
    affirmation: "MTN offre 5 000 000 FCFA via un tirage WhatsApp.",
    statut: "faux" as const,
    confiance: 99,
    sources: ["MTN Cameroon - service presse"],
    conclusion: "Il s'agit d'une campagne d'escroquerie usurpant l'identité de MTN.",
    date: "2026-07-02",
  },
];

export const articles = [
  {
    id: "art-1",
    titre: "Reconnaître une tentative d'hameçonnage",
    categorie: "Cybersécurité",
    duree: "6 min",
    resume: "Les 8 signaux à connaître pour identifier un message frauduleux.",
  },
  {
    id: "art-2",
    titre: "Signaler un contenu en toute sécurité",
    categorie: "Citoyenneté numérique",
    duree: "4 min",
    resume: "Comment protéger votre identité lors d'un signalement anonyme.",
  },
  {
    id: "art-3",
    titre: "Comprendre la désinformation virale",
    categorie: "Éducation aux médias",
    duree: "9 min",
    resume: "Mécanismes et biais qui accélèrent la propagation des fausses nouvelles.",
  },
  {
    id: "art-4",
    titre: "Protéger les mineurs sur les réseaux",
    categorie: "Protection de l'enfance",
    duree: "7 min",
    resume: "Bonnes pratiques et cadres légaux au Cameroun.",
  },
  {
    id: "art-5",
    titre: "Cyberharcèlement : recours et démarches",
    categorie: "Cybersécurité",
    duree: "8 min",
    resume: "Procédure pas à pas pour porter plainte et faire retirer le contenu.",
  },
  {
    id: "art-6",
    titre: "Vérifier une image ou vidéo",
    categorie: "Fact-checking",
    duree: "5 min",
    resume: "Outils de recherche inversée et lecture des métadonnées.",
  },
];

export const notifications = [
  {
    id: "n-1",
    titre: "Nouvelle alerte critique",
    corps: "#A-2026-000128 — Appel à la violence à Douala",
    horodatage: "il y a 3 min",
    type: "critique" as const,
    lu: false,
  },
  {
    id: "n-2",
    titre: "Alerte assignée",
    corps: "S. Ekambi vous a assigné #A-2026-000126",
    horodatage: "il y a 22 min",
    type: "info" as const,
    lu: false,
  },
  {
    id: "n-3",
    titre: "Résultat d'analyse IA disponible",
    corps: "Score de risque 78/100 pour #A-2026-000124",
    horodatage: "il y a 1 h",
    type: "info" as const,
    lu: true,
  },
  {
    id: "n-4",
    titre: "Rapport hebdomadaire prêt",
    corps: "Semaine du 06/07/2026 — 128 alertes traitées",
    horodatage: "hier",
    type: "info" as const,
    lu: true,
  },
];

export function severityLabel(s: Severity) {
  return { critique: "Critique", eleve: "Élevé", moyen: "Moyen", faible: "Faible" }[s];
}

export function statusLabel(s: AlertStatus) {
  return {
    nouveau: "Nouveau",
    en_cours: "En cours",
    assigne: "Assigné",
    resolu: "Résolu",
    clos: "Clos",
  }[s];
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
