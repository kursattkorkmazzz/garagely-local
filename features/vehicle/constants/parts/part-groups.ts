export enum PartGroups {
  ENGINE = "engine",
  FILTER = "filter",
  IGNITION = "ignition",
  FUEL_SYSTEM = "fuel_system",
  COOLING = "cooling",
  FLUID = "fluid",
  TRANSMISSION = "transmission",
  BRAKE = "brake",
  SUSPENSION = "suspension",
  TIRE = "tire",
  ELECTRICAL = "electrical",
  LIGHTING = "lighting",
  HVAC = "hvac",
  BODY = "body",
  INTERIOR = "interior",
  EV = "ev",
  SENSOR = "sensor",
}

export type PartGroup = (typeof PartGroups)[keyof typeof PartGroups];
