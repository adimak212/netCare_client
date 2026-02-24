import DraggableItem from "./DraggableItem.js";
import type { ComponentType } from "@/types/types.js";
import pcIcon from "@/assets/icons/pc.png";
import switchIcon from "@/assets/icons/switch.png";
import routerIcon from "@/assets/icons/router.png";
import cloudIcon from "@/assets/icons/cloud.png";

const onDragStart = (e: React.DragEvent<HTMLDivElement>, component: ComponentType) => {
  e.dataTransfer.setData("component", JSON.stringify(component));
};

const items: ComponentType[] = [
  {
    id: "pc",
    label: "PC",
    icon: pcIcon,
    onDragStart,
    node_id: null,
  },
  {
    id: "switch",
    label: "Switch",
    icon: switchIcon,
    onDragStart,
    node_id: null,
  },
  {
    id: "router",
    label: "Router",
    icon: routerIcon,
    onDragStart,
    node_id: null,
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: cloudIcon,
    onDragStart,
    node_id: null,
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
