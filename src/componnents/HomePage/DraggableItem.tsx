import type { ComponentType } from "../../types/types.js";

export default function DraggableItem({
  id,
  label,
  icon,
  onDragStart,
}: ComponentType) {
  return (
    <div
      key={id}
      draggable
      onDragStart={(e) =>
        onDragStart(e, { id, label, icon, onDragStart, instanceId: null })
      }
      className="flex items-center gap-4 bg-bgSex py-4 pr-6 pl-3 rounded-md w-56 z-10"
    >
      <img
        src={icon}
        alt=""
        className="w-10 rounded-md bg-primary p-2 bg-opacity-20"
      />
      <span className="z-10">{label}</span>
    </div>
  );
}
