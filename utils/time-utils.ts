import { Timezone } from "@/constants";

export class TimeUtils {
  static getTimezoneLabelFromTimezone(timezone: Timezone): string {
    const parts = timezone.split("/");
    return parts.map((part) => part.replaceAll(/_/g, " ")).join(" ");
  }
}
