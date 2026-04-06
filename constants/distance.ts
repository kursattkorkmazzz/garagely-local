export const DistanceUnits = {
  KM: "km",
  MI: "mi",
} as const;

export type DistanceUnit = (typeof DistanceUnits)[keyof typeof DistanceUnits];
