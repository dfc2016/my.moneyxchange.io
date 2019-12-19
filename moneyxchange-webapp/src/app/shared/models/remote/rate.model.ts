export interface Rate {
  base: string;
  date: string;
  rates: { [value: string]: number };
}
