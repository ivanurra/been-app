import { useEffect, useState } from "react";
import { CountryVisit, SortKey } from "../../types";

export default function useCountriesData() {
  const [data, setData] = useState<CountryVisit[]>([]);
  const [filteredData, setFilteredData] = useState<CountryVisit[]>([]);
  const [continentFilter, setContinentFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetch("/countries_with_iso.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    let result = [...data];

    if (continentFilter) {
      result = result.filter(
        (d) => d.continent.toLowerCase() === continentFilter.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

    setFilteredData(result);
  }, [data, continentFilter, sortKey, sortAsc]);

  return {
    data,
    filteredData,
    sortKey,
    sortAsc,
    continentFilter,
    toggleSort: (key: SortKey) => {
      if (key === sortKey) {
        setSortAsc(!sortAsc);
      } else {
        setSortKey(key);
        setSortAsc(key === "order" ? false : true); // 👈 Default descendente sólo para "order"
      }
    },
    clearFilter: () => setContinentFilter(""),
    filterByContinent: (continent: string) =>
      setContinentFilter((prev) => (prev === continent ? "" : continent)),
  };
}
