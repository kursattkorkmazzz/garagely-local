export enum FuelTypes {
  GASOLINE = "gasoline",
  DIESEL = "diesel",
  ELECTRIC = "electric",
  HYBRID = "hybrid",
  LPG = "lpg",
}
export type FuelType = (typeof FuelTypes)[keyof typeof FuelTypes];
