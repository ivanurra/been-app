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
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs md:text-lg">
            <tr>
              <th
                className="px-4 md:px-8 py-3 md:py-5 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("country")}
              >
                Country {sortKey === "country" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th className="px-4 md:px-8 py-3 md:py-5 text-left border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <span>Continent</span>
                  <button
                    onClick={() => onToggleSort("continent")}
                    className="text-xs md:text-sm px-2 py-1 bg-white border rounded hover:bg-gray-100"
                  >
                    Sort {sortKey === "continent" ? (sortAsc ? "▲" : "▼") : ""}
                  </button>
                </div>
              </th>
              <th
                className="px-4 md:px-8 py-3 md:py-5 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("year")}
              >
                Year {sortKey === "year" ? (sortAsc ? "▲" : "▼") : ""}
              </th>
              <th
                className="px-4 md:px-6 py-3 md:py-5 text-left cursor-pointer border-b border-gray-300 w-24"
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
                className="hover:bg-gray-50 transition-colors border-b border-gray-200 text-sm md:text-lg text-gray-800"
              >
                <td className="px-4 md:px-8 py-3 md:py-5 font-medium flex items-center gap-2 md:gap-4">
                  {visit.isoCode && (
                    <img
                      src={`https://flagcdn.com/h20/${visit.isoCode.toLowerCase()}.png`}
                      alt={`Flag of ${visit.country}`}
                      className="w-auto h-5 md:h-6 rounded-sm shadow-sm"
                    />
                  )}
                  {visit.country}
                </td>
                <td className="px-4 md:px-8 py-3 md:py-5">
                  <button
                    onClick={() => onContinentClick(visit.continent)}
                    className="underline hover:text-blue-600"
                  >
                    {visit.continent}
                  </button>
                </td>
                <td className="px-4 md:px-8 py-3 md:py-5">{visit.year}</td>
                <td className="px-4 md:px-6 py-3 md:py-5">{visit.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
