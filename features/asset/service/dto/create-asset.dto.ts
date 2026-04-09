import { ImageMimeType, ImageMimeTypeValidator } from "@/features/asset/contants/mime-types";
import z from "zod";

export const CreateAssetDtoValidator = z.object({
  sourceUri: z.string().nonempty(),
  name: z.string().nonempty().max(255),
  mimeType: ImageMimeTypeValidator,
});

export type CreateAssetDto = z.infer<typeof CreateAssetDtoValidator>;
