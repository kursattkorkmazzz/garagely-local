export enum HybridFuelTypes {
  PLUG_IN_HYBRID = "plug-in_hybrid",
  MILD_HYBRID = "mild_hybrid",
}

export type HybridFuelType =
  (typeof HybridFuelTypes)[keyof typeof HybridFuelTypes];
