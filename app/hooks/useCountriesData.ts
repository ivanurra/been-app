import { useCallback, useEffect, useMemo, useState } from "react";
import { CountryVisit, SortKey } from "../../types";

const TOTAL_CONTINENTS = 6;

export default function useCountriesData() {
  const [data, setData] = useState<CountryVisit[]>([]);
  const [continentFilter, setContinentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetch("/countries_with_iso.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error("Failed to load countries:", err));
  }, []);

  const continents = useMemo(() => {
    const set = new Set(data.map((d) => d.continent));
    return Array.from(set).sort();
  }, [data]);

  const continentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const d of data) {
      counts[d.continent] = (counts[d.continent] || 0) + 1;
    }
    return counts;
  }, [data]);

  const continentsVisited = useMemo(
    () => new Set(data.map((d) => d.continent)).size,
    [data]
  );

  const lastVisited = useMemo(() => {
    if (data.length === 0) return null;
    return data.reduce((max, d) => (d.order > max.order ? d : max), data[0]);
  }, [data]);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (continentFilter) {
      result = result.filter((d) => d.continent === continentFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((d) => d.country.toLowerCase().includes(query));
    }

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortAsc
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [data, continentFilter, searchQuery, sortKey, sortAsc]);

  const visitedIsoCodes = useMemo(
    () =>
      new Set(
        data
          .map((d) => d.isoCode?.toUpperCase())
          .filter((code): code is string => Boolean(code))
      ),
    [data]
  );

  const toggleSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) {
        setSortAsc((prev) => !prev);
      } else {
        setSortKey(key);
        setSortAsc(key !== "order");
      }
    },
    [sortKey]
  );

  const clearFilter = useCallback(() => setContinentFilter(""), []);

  const filterByContinent = useCallback((continent: string) => {
    setContinentFilter((prev) => (prev === continent ? "" : continent));
  }, []);

  return {
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
    totalContinents: TOTAL_CONTINENTS,
    setSearchQuery,
    toggleSort,
    clearFilter,
    filterByContinent,
  };
}
