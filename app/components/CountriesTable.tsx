"use client";

import { CountryVisit, SortKey } from "../../types";

type Props = {
  data: CountryVisit[];
  filteredData: CountryVisit[];
  sortKey: SortKey;
  sortAsc: boolean;
  continentFilter: string;
  onClearFilter: () => void;
  onToggleSort: (key: SortKey) => void;
  onContinentClick: (continent: string) => void;
};

export default function CountriesTable({
  data,
  filteredData,
  sortKey,
  sortAsc,
  continentFilter,
  onClearFilter,
  onToggleSort,
  onContinentClick,
}: Props) {
  return (
    <div className="w-full">
      <div className="text-sm md:text-lg mb-4 md:mb-6 text-gray-600">
        {continentFilter && (
          <button
            onClick={onClearFilter}
            className="underline hover:text-blue-600"
          >
            Remove continent filter: {continentFilter}
          </button>
        )}
      </div>

      <div className="w-full rounded-lg shadow overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-0 text-xs md:text-base">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
            <tr>
              <th
                className="w-[30%] px-2 md:px-4 py-3 md:py-4 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("country")}
              >
                Country {sortKey === "country" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th className="w-[28%] px-2 md:px-4 py-3 md:py-4 text-left border-b border-gray-300">
                <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
                  <span>Continent</span>
                  <button
                    onClick={() => onToggleSort("continent")}
                    className="text-[10px] md:text-xs px-1.5 py-0.5 bg-white border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <span className="hidden md:inline">Sort</span>
                    <span className="inline md:ml-1">
                      {sortKey === "continent" ? (sortAsc ? "▲" : "▼") : "↕"}
                    </span>
                  </button>
                </div>
              </th>
              <th
                className="w-[22%] px-2 md:px-4 py-3 md:py-4 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("year")}
              >
                Year {sortKey === "year" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th
                className="w-[20%] px-2 md:px-3 py-3 md:py-4 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("order")}
              >
                Order {sortKey === "order" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((visit, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors border-b border-gray-200 text-gray-800"
              >
                <td className="px-2 md:px-4 py-2 md:py-4 font-medium flex items-center gap-1.5 md:gap-3">
                  {visit.isoCode && (
                    <div className="w-5 h-3 flex items-center justify-center overflow-hidden rounded-sm shadow-sm">
                      <img
                        src={`https://flagcdn.com/h20/${visit.isoCode.toLowerCase()}.png`}
                        alt={`Flag of ${visit.country}`}
                        className="w-auto h-full object-contain"
                      />
                    </div>
                  )}
                  <span className="truncate">{visit.country}</span>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4">
                  <button
                    onClick={() => onContinentClick(visit.continent)}
                    className="underline hover:text-blue-600 whitespace-nowrap"
                  >
                    {visit.continent}
                  </button>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap">
                  {visit.year}
                </td>
                <td className="px-2 md:px-3 py-2 md:py-4">{visit.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
