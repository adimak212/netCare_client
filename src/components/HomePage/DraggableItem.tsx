

import type { ComponentType } from "../../types/types";


export default function DraggableItem({ id, label , onDragStart}: ComponentType ) {
    return(
    <div
            key={id}
            draggable
            onDragStart={(e) => onDragStart(e, { id, label  , onDragStart , instanceId :null})}
            style={{
              border: "1px solid gray",
              margin: "5px",
              padding: "5px",
              cursor: "grab",
            }}
          >
            {label}
          </div>
    );
}