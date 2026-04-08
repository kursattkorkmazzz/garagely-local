export enum ChargingTypes {
  AC = "AC",
  DC = "DC",
}

export type ChargingType = (typeof ChargingTypes)[keyof typeof ChargingTypes];
