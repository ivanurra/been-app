export type CountryVisit = {
  country: string;
  continent: string;
  year: number;
  order: number;
  isoCode?: string;
};

export type SortKey = "country" | "continent" | "year" | "order";
