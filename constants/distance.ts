import z from "zod";

export const DistanceUnits = {
  KM: "km",
  MI: "mi",
} as const;

export type DistanceUnit = (typeof DistanceUnits)[keyof typeof DistanceUnits];

export const DistanceDtoValidator = z.object({
  amount: z.int().min(0),
  unit: z.enum(DistanceUnits),
});
export type DistanceDto = z.infer<typeof DistanceDtoValidator>;
