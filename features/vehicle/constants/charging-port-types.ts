export enum ChargingPortTypes {
  TYPE_1 = "type_1",
  TYPE_2 = "type_2",
  CCS = "ccs",
  CHAdeMO = "chademo",
  TESLA = "tesla",
}

export type ChargingPortType =
  (typeof ChargingPortTypes)[keyof typeof ChargingPortTypes];
