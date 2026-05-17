import { PRIORITY, type Priority, type UserIntent } from "../types/intent";

export class IntentWeightMapper {
  static priorityToWeight(priority: Priority): number {
    switch (priority) {
      case PRIORITY.IGNORE:
        return 0;

      case PRIORITY.LOW:
        return 2;

      case PRIORITY.MEDIUM:
        return 5;

      case PRIORITY.HIGH:
        return 8;

      case PRIORITY.CRITICAL:
        return 10;

      default:
        return 1;
    }
  }

  static amplify(weight: number): number {
    return weight ** 2;
  }
}
