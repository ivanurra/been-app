"use client";

import Image from "next/image";
import Link from "next/link";
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

  const TOTAL_COUNTRIES = 100;
  const percentageVisited = Math.round((data.length / TOTAL_COUNTRIES) * 100);

  return (
    <main className="w-full px-8 py-10">
      <div className="mb-6 flex justify-center sm:justify-start">
        <Link href="/">
          <div className="mx-auto sm:mx-0 w-32 h-auto">
            <Image
              src="/logo.png"
              alt="Been App Logo"
              width={130}
              height={130}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <StatsCard
          title="Country Goal"
          value={`${data.length} / ${TOTAL_COUNTRIES}`}
          icon={<span>🌎</span>}
          subtext="Visited"
        />
        <StatsCard
          title="Progress"
          value={`${percentageVisited}%`}
          subtext={`${data.length} of ${TOTAL_COUNTRIES} countries`}
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
