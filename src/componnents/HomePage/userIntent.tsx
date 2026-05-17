import { useState } from "react";
import { PRIORITY, type Priority, type UserIntent } from "../../types/intent";
import { IntentWeightMapper } from "../../classes/IntentWeightMapper";
interface NetworkRequirements {
  pcs: number;
}
interface UserIntentFormProps {
  requirements: NetworkRequirements;
  intent: UserIntent;
  setIntent: React.Dispatch<React.SetStateAction<UserIntent>>;
  setRequirements: React.Dispatch<React.SetStateAction<NetworkRequirements>>;
}
const priorityOptions: Priority[] = [
  PRIORITY.IGNORE,
  PRIORITY.LOW,
  PRIORITY.MEDIUM,
  PRIORITY.HIGH,
  PRIORITY.CRITICAL,
];

export default function UserIntentForm({
  requirements,
  intent,
  setIntent,
  setRequirements,
}: UserIntentFormProps) {

  function updateIntent(key: keyof UserIntent, value: Priority) {
    setIntent((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[90%]">
        <div className="flex items-center justify-between w-full mb-5">
          <label className="text-lg font-bold">PCs</label>
          <input
            type="number"
            min={0}
            max={1000}
            value={requirements.pcs}
            onChange={(e) =>
              setRequirements({
                ...requirements,
                pcs: Number(e.target.value),
              })
            }
            className="
              text-black
              rounded
              px-3
              py-1
              w-[30%]
              text-center
            "
          />
        </div>
      </div>

      <div className="w-[90%]">
        {Object.keys(intent).map((key) => (
          <div
            key={key}
            className="
              flex
              justify-between
              items-center
              mb-4
            "
          >
            <label className="text-lg font-bold capitalize">{key}</label>
            <select
              value={intent[key as keyof UserIntent]}
              onChange={(e) => updateIntent(key as keyof UserIntent, e.target.value as Priority)}
              className="
                text-black
                rounded
                px-2
                py-1
                w-[30%]
                text-center
              "
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
