import z from "zod";

export const VolumeUnits = {
  LITER: "L",
  GALLON: "gal",
} as const;

export type VolumeUnit = (typeof VolumeUnits)[keyof typeof VolumeUnits];

export const VolumeDtoValidator = z.object({
  value: z.number(),
  unit: z.enum(VolumeUnits),
});
export type VolumeDto = z.infer<typeof VolumeDtoValidator>;
