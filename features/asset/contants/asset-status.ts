export const AssetStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
} as const;

export type AssetStatusType = (typeof AssetStatus)[keyof typeof AssetStatus];

export const PENDING_ASSET_CLEANUP_THRESHOLD_HOURS = 24;
