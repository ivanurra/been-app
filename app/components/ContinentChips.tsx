"use client";

import { getContinentStyle } from "../lib/continents";

type Props = {
  continents: string[];
  continentCounts: Record<string, number>;
  activeFilter: string;
  onFilter: (continent: string) => void;
  onClear: () => void;
};

export default function ContinentChips({
  continents,
  continentCounts,
  activeFilter,
  onFilter,
  onClear,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onClear}
        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          !activeFilter
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
        }`}
      >
        All
      </button>
      {continents.map((continent) => {
        const style = getContinentStyle(continent);
        const isActive = activeFilter === continent;

        return (
          <button
            key={continent}
            onClick={() => onFilter(continent)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              isActive
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : `${style.bg} ${style.color} hover:opacity-80 dark:opacity-90`
            }`}
          >
            <span className="text-xs">{style.emoji}</span>
            <span className="hidden sm:inline">{continent}</span>
            <span className="sm:hidden">{style.shortLabel}</span>
            <span
              className={`text-xs ${isActive ? "text-slate-300 dark:text-slate-500" : "opacity-60"}`}
            >
              {continentCounts[continent] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
