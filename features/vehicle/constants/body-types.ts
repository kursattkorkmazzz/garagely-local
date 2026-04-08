export enum BodyTypes {
  SEDAN = "sedan",
  HATCHBACK = "hatchback",
  SUV = "suv",
  COUPE = "coupe",
  PICKUP = "pickup",
  VAN = "van",
  WAGON = "wagon",
  CONVERTIBLE = "convertible",
}

export type BodyType = (typeof BodyTypes)[keyof typeof BodyTypes];
