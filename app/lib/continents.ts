type ContinentStyle = {
  color: string;
  bg: string;
  emoji: string;
  shortLabel: string;
};

const DEFAULT_STYLE: ContinentStyle = {
  color: "text-gray-700",
  bg: "bg-gray-100",
  emoji: "🌐",
  shortLabel: "—",
};

export const CONTINENT_CONFIG: Record<string, ContinentStyle> = {
  Europe: { color: "text-blue-700", bg: "bg-blue-100", emoji: "🏰", shortLabel: "Europe" },
  Asia: { color: "text-rose-700", bg: "bg-rose-100", emoji: "⛩️", shortLabel: "Asia" },
  Africa: { color: "text-amber-700", bg: "bg-amber-100", emoji: "🌍", shortLabel: "Africa" },
  "North America": { color: "text-emerald-700", bg: "bg-emerald-100", emoji: "🗽", shortLabel: "N.Am" },
  "South America": { color: "text-violet-700", bg: "bg-violet-100", emoji: "🌎", shortLabel: "S.Am" },
  Oceania: { color: "text-cyan-700", bg: "bg-cyan-100", emoji: "🏝️", shortLabel: "Oceania" },
};

export function getContinentStyle(continent: string): ContinentStyle {
  return CONTINENT_CONFIG[continent] ?? DEFAULT_STYLE;
}
