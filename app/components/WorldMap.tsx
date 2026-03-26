"use client";

import { memo, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useTheme } from "./ThemeProvider";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;
const MAP_ROTATION: [number, number, number] = [-10, 0, 0];
const MAP_SCALE = 147;

// Fallback mapping for countries where world-atlas has ISO_A2 as "-99"
const NUMERIC_TO_ISO: Record<string, string> = {
  "250": "FR", "578": "NO", "826": "GB", "840": "US", "156": "CN",
  "380": "IT", "276": "DE", "724": "ES", "620": "PT", "392": "JP",
  "356": "IN", "036": "AU", "076": "BR", "484": "MX", "032": "AR",
  "710": "ZA", "818": "EG", "504": "MA", "764": "TH", "704": "VN",
  "410": "KR", "608": "PH", "360": "ID", "458": "MY", "702": "SG",
  "144": "LK", "784": "AE", "792": "TR", "300": "GR", "528": "NL",
  "056": "BE", "040": "AT", "756": "CH", "203": "CZ", "616": "PL",
  "348": "HU", "191": "HR", "643": "RU", "376": "IL", "170": "CO",
  "152": "CL", "604": "PE", "858": "UY", "554": "NZ",
};

const THEME_COLORS = {
  light: {
    visited: "#0d9488",
    visitedHover: "#0f766e",
    unvisited: "#e2e8f0",
    unvisitedHover: "#cbd5e1",
    stroke: "#ffffff",
  },
  dark: {
    visited: "#2dd4bf",
    visitedHover: "#5eead4",
    unvisited: "#1e293b",
    unvisitedHover: "#334155",
    stroke: "#0f172a",
  },
} as const;

type Props = {
  visitedIsoCodes: Set<string>;
};

function resolveIsoCode(geo: { properties?: Record<string, string>; id?: string }): string {
  const isoA2 = geo.properties?.ISO_A2;
  if (isoA2 && isoA2 !== "-99") return isoA2;
  return NUMERIC_TO_ISO[geo.id ?? ""] ?? "";
}

function WorldMap({ visitedIsoCodes }: Props) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const { theme } = useTheme();

  const colors = useMemo(() => THEME_COLORS[theme], [theme]);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/60 dark:border-slate-700/50 shadow-sm relative">
      {hoveredCountry && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg shadow-lg pointer-events-none">
          {hoveredCountry}
        </div>
      )}

      <ComposableMap
        projectionConfig={{ rotate: MAP_ROTATION, scale: MAP_SCALE }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso = resolveIsoCode(geo);
                const isVisited = visitedIsoCodes.has(iso);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isVisited ? colors.visited : colors.unvisited}
                    stroke={colors.stroke}
                    strokeWidth={0.5}
                    onMouseEnter={() => setHoveredCountry(geo.properties?.name ?? null)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: {
                        outline: "none",
                        transition: "fill 0.2s ease",
                      },
                      hover: {
                        fill: isVisited ? colors.visitedHover : colors.unvisitedHover,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="flex items-center justify-center gap-6 pb-4 px-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-teal-600 dark:bg-teal-400" />
          Visited
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700" />
          Not yet
        </div>
      </div>
    </div>
  );
}

export default memo(WorldMap);
