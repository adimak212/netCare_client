

import DraggableItem from "./DraggableItem";
import type { ComponentType } from "../../types/types";

type SideBarProps = {
    componentsLibrary: ComponentType[];
};

export function SideBar({ componentsLibrary }: SideBarProps) {
    return (
    <div style={{ display: "flex", gap: "20px" , height: "80vh"}}>
      {/* ספריית רכיבים */}
      <div
        style={{
          width: "150px",
          border: "1px solid black",
          padding: "10px",
        }}
      >
        <h3>Library</h3>
        {componentsLibrary.map((comp) => (
            <DraggableItem
              key={comp.id}
              id={comp.id}
              label={comp.label}
              onDragStart={comp.onDragStart}
              instanceId={null}
            />
        ))}
      </div>
    </div>  
    );
}