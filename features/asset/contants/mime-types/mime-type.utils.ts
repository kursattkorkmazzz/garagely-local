import { ImageMimeType } from "./image-mime-types";

type MimeType = ImageMimeType;

const mimeToExtensionMap: Record<MimeType, string> = {
  [ImageMimeType.JPEG]: "jpg",
  [ImageMimeType.JPG]: "jpg",
  [ImageMimeType.PNG]: "png",
  [ImageMimeType.GIF]: "gif",
  [ImageMimeType.BMP]: "bmp",
  [ImageMimeType.WEBP]: "webp",
};

export function getExtensionFromMimeType(mimeType: MimeType): string {
  const extension = mimeToExtensionMap[mimeType];
  if (!extension) {
    throw new Error(`Unsupported mime type: ${mimeType}`);
  }
  return extension;
}
