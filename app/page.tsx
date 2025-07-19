"use client";

import useCountriesData from "./hooks/useCountriesData";
import StatsCard from "./components/StatsCard";
import CountriesTable from "./components/CountriesTable";

export default function Home() {
  const {
    data,
    filteredData,
    sortKey,
    sortAsc,
    continentFilter,
    toggleSort,
    clearFilter,
    filterByContinent,
  } = useCountriesData();

  const TOTAL_COUNTRIES = 195;
  const percentageVisited = Math.round((data.length / TOTAL_COUNTRIES) * 100);

  return (
    <main className="w-full px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Been App</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <StatsCard
          title="Países"
          value={`${data.length} / ${TOTAL_COUNTRIES}`}
          icon={<span>🌎</span>}
        />
        <StatsCard
          title="En Total"
          value={`${percentageVisited}%`}
          subtext={` / ${data.length}`}
        />
      </div>

      <CountriesTable
        data={data}
        filteredData={filteredData}
        sortKey={sortKey}
        sortAsc={sortAsc}
        continentFilter={continentFilter}
        onClearFilter={clearFilter}
        onToggleSort={toggleSort}
        onContinentClick={filterByContinent}
      />
    </main>
  );
}
