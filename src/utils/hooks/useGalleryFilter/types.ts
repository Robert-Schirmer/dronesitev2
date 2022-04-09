export type FilterOptions = string[];

export interface Filter {
  label: string;
  selected: string;
  options: FilterOptions;
}
