import { PRIORITY, type Priority, type UserIntent } from "../types/intent";

export class IntentWeightMapper {
  static priorityToWeight(priority: Priority): number {
    switch (priority) {
      case PRIORITY.IGNORE:
        return 0;

      case PRIORITY.LOW:
        return 25;

      case PRIORITY.MEDIUM:
        return 50;

      case PRIORITY.HIGH:
        return 75;

      case PRIORITY.CRITICAL:
        return 100;

      default:
        return 30;
    }
  }

  static amplify(weight: number): number {
    return weight ** 2;
  }
}
