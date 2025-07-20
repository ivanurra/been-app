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
      {continentFilter && (
        <div className="text-sm md:text-lg mb-4 md:mb-6 text-gray-600">
          <button
            onClick={onClearFilter}
            className="underline hover:text-blue-600"
          >
            Remove continent filter: {continentFilter}
          </button>
        </div>
      )}

      <div className="w-full rounded-lg shadow overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-0 text-[11px] md:text-base">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
            <tr>
              <th
                className="w-[35%] md:w-[40%] px-2 md:px-4 py-2 md:py-4 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("country")}
              >
                <div className="flex items-center gap-1">
                  <span>Country</span>
                  {sortKey === "country" && <span>{sortAsc ? "▲" : "▼"}</span>}
                </div>
              </th>
              <th className="w-[25%] md:w-[30%] px-2 md:px-4 py-2 md:py-4 text-left border-b border-gray-300">
                <div className="flex items-center gap-1">
                  <span>Continent</span>
                  <button
                    onClick={() => onToggleSort("continent")}
                    className="text-[10px] md:text-xs px-1 md:px-2 py-0.5 border rounded hover:bg-gray-100"
                  >
                    Sort {sortKey === "continent" && (sortAsc ? "▲" : "▼")}
                  </button>
                </div>
              </th>
              <th
                className="w-[20%] md:w-[15%] px-2 md:px-4 py-2 md:py-4 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("year")}
              >
                <div className="flex items-center gap-1">
                  <span>Year</span>
                  {sortKey === "year" && <span>{sortAsc ? "▲" : "▼"}</span>}
                </div>
              </th>
              <th
                className="w-[20%] md:w-[15%] px-2 md:px-4 py-2 md:py-4 text-left cursor-pointer border-b border-gray-300"
                onClick={() => onToggleSort("order")}
              >
                <div className="flex items-center gap-1">
                  <span>Order</span>
                  {sortKey === "order" && <span>{sortAsc ? "▲" : "▼"}</span>}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((visit, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors border-b border-gray-200 text-xs md:text-base text-gray-800"
              >
                <td className="px-2 md:px-4 py-2 md:py-4 font-medium flex items-center gap-2 md:gap-3">
                  {visit.isoCode && (
                    <img
                      src={`https://flagcdn.com/h20/${visit.isoCode.toLowerCase()}.png`}
                      alt={`Flag of ${visit.country}`}
                      className="w-5 h-3 md:w-6 md:h-4 rounded-sm"
                    />
                  )}
                  {visit.country}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4">
                  <button
                    onClick={() => onContinentClick(visit.continent)}
                    className="underline hover:text-blue-600 whitespace-nowrap"
                  >
                    {visit.continent}
                  </button>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4">{visit.year}</td>
                <td className="px-2 md:px-4 py-2 md:py-4">{visit.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
