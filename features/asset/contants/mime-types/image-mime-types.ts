import z from "zod";

export enum ImageMimeType {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  GIF = "image/gif",
  BMP = "image/bmp",
  WEBP = "image/webp",
}

export const ImageMimeTypeValidator = z.enum(ImageMimeType);
