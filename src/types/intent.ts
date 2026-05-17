export const PRIORITY = {
  IGNORE: "ignore",
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical"
} as const;

export type Priority =
  typeof PRIORITY[keyof typeof PRIORITY];

export interface UserIntent {
  scalability: Priority
  redundancy: Priority
  cost: Priority
}