export type CountryVisit = {
  country: string;
  continent: string;
  year: number;
  order: number;
};

export type SortKey = "country" | "continent" | "year" | "order";
