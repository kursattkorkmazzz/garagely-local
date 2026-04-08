export enum TransmissionTypes {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
  CVT = "cvt",
}

export type TransmissionType =
  (typeof TransmissionTypes)[keyof typeof TransmissionTypes];
