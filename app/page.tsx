"use client";

import dynamic from "next/dynamic";
import useCountriesData from "./hooks/useCountriesData";
import Logo from "./components/Logo";
import StatsCard from "./components/StatsCard";
import CountriesTable from "./components/CountriesTable";
import ContinentChips from "./components/ContinentChips";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";

const TOTAL_COUNTRIES = 100;

const MapSkeleton = () => (
  <div className="w-full h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
);

const WorldMap = dynamic(() => import("./components/WorldMap"), {
  ssr: false,
  loading: MapSkeleton,
});

export default function Home() {
  const {
    data,
    filteredData,
    sortKey,
    sortAsc,
    continentFilter,
    searchQuery,
    continents,
    continentCounts,
    continentsVisited,
    lastVisited,
    visitedIsoCodes,
    totalContinents,
    setSearchQuery,
    toggleSort,
    clearFilter,
    filterByContinent,
  } = useCountriesData();

  const percentageVisited = Math.round((data.length / TOTAL_COUNTRIES) * 100);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-10 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <Logo size="lg" />
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 ml-0.5">
              {data.length} countries explored.{" "}
              <span className="text-teal-600 dark:text-teal-400 font-medium">
                {TOTAL_COUNTRIES - data.length} to go.
              </span>
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 stagger-children">
        <StatsCard
          title="Progress"
          value={`${percentageVisited}%`}
          progress={percentageVisited}
          subtext={`${data.length} of ${TOTAL_COUNTRIES}`}
          accent
        />
        <StatsCard
          title="Countries"
          value={`${data.length}`}
          icon={<span>🌍</span>}
          subtext="visited"
        />
        <StatsCard
          title="Continents"
          value={`${continentsVisited}/${totalContinents}`}
          icon={<span>🗺️</span>}
          subtext="explored"
        />
        <StatsCard
          title="Last visited"
          value={lastVisited?.country ?? "—"}
          icon={<span>✈️</span>}
          subtext={lastVisited ? `#${lastVisited.order}` : ""}
        />
      </section>

      {/* Map */}
      <section className="mb-8 animate-fade-in-up">
        <WorldMap visitedIsoCodes={visitedIsoCodes} />
      </section>

      {/* Filters & Search */}
      <section className="mb-6 space-y-4 animate-fade-in-up">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredData.length}
          totalCount={data.length}
        />
        <ContinentChips
          continents={continents}
          continentCounts={continentCounts}
          activeFilter={continentFilter}
          onFilter={filterByContinent}
          onClear={clearFilter}
        />
      </section>

      {/* Table */}
      <section className="mb-12 animate-fade-in-up">
        {filteredData.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-lg font-medium">No countries found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <CountriesTable
            filteredData={filteredData}
            sortKey={sortKey}
            sortAsc={sortAsc}
            onToggleSort={toggleSort}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-3 py-8 border-t border-slate-200 dark:border-slate-800">
        <Logo size="sm" />
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Tracking {TOTAL_COUNTRIES} countries around the world
        </p>
      </footer>
    </main>
  );
}
