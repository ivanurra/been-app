"use client";

import { CountryVisit, SortKey } from "../../types";
import { getContinentStyle } from "../lib/continents";

type Props = {
  filteredData: CountryVisit[];
  sortKey: SortKey;
  sortAsc: boolean;
  onToggleSort: (key: SortKey) => void;
};

const COLUMNS: { key: SortKey; label: string; width: string }[] = [
  { key: "country", label: "Country", width: "w-[38%]" },
  { key: "continent", label: "Continent", width: "w-[28%]" },
  { key: "year", label: "Year", width: "w-[17%]" },
  { key: "order", label: "#", width: "w-[17%]" },
];

function SortIcon({
  columnKey,
  sortKey,
  sortAsc,
}: {
  columnKey: SortKey;
  sortKey: SortKey;
  sortAsc: boolean;
}) {
  if (sortKey !== columnKey) {
    return (
      <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {sortAsc ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );
}

export default function CountriesTable({
  filteredData,
  sortKey,
  sortAsc,
  onToggleSort,
}: Props) {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} px-4 md:px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition-colors select-none`}
                  onClick={() => onToggleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon columnKey={col.key} sortKey={sortKey} sortAsc={sortAsc} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {filteredData.map((visit) => {
              const continentStyle = getContinentStyle(visit.continent);

              return (
                <tr
                  key={visit.order}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-4 md:px-5 py-3 md:py-4">
                    <div className="flex items-center gap-3">
                      {visit.isoCode && (
                        <div className="w-8 h-6 flex-shrink-0 rounded-sm overflow-hidden shadow-sm ring-1 ring-black/5">
                          <img
                            src={`https://flagcdn.com/h40/${visit.isoCode.toLowerCase()}.png`}
                            alt={`Flag of ${visit.country}`}
                            width={32}
                            height={24}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                        {visit.country}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-5 py-3 md:py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${continentStyle.bg} ${continentStyle.color}`}
                    >
                      {visit.continent}
                    </span>
                  </td>
                  <td className="px-4 md:px-5 py-3 md:py-4 text-slate-600 dark:text-slate-300 tabular-nums">
                    {visit.year || "—"}
                  </td>
                  <td className="px-4 md:px-5 py-3 md:py-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                      {visit.order}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
