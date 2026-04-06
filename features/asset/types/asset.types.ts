export type AssetOwnerType = "vehicle";
export type AssetType = "image";

export interface Asset {
  id: string;
  ownerType: AssetOwnerType;
  ownerId: string;
  assetType: AssetType;
  filePath: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  createdAt: string;
}

export interface CreateAssetPayload {
  ownerType: AssetOwnerType;
  ownerId: string;
  assetType: AssetType;
  filePath: string;
  mimeType: string;
  width?: number;
  height?: number;
}
