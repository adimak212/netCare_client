import DraggableItem from "./DraggableItem.js";
import type { ComponentType } from "../../types/types.js";
import pcIcon from "../../assets/icons/pc.png";
import switchIcon from "../../assets/icons/switch.png";
import routerIcon from "../../assets/icons/router.png";
import cloudIcon from "../../assets/icons/cloud.png";

const onDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  component: ComponentType
) => {
  e.dataTransfer.setData("component", JSON.stringify(component));
};

const items: ComponentType[] = [
  {
    id: "pc",
    label: "PC",
    icon: pcIcon,
    onDragStart,
    instanceId: null,
  },
  {
    id: "switch",
    label: "Switch",
    icon: switchIcon,
    onDragStart,
    instanceId: null,
  },
  {
    id: "router",
    label: "Router",
    icon: routerIcon,
    onDragStart,
    instanceId: null,
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: cloudIcon,
    onDragStart,
    instanceId: null,
  },
];

export function SideBar() {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {items.map((comp) => (
        <DraggableItem {...comp} />
      ))}
    </div>
  );
}
