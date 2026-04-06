export const VolumeUnits = {
  LITER: "L",
  GALLON: "gal",
} as const;

export type VolumeUnit = (typeof VolumeUnits)[keyof typeof VolumeUnits];
