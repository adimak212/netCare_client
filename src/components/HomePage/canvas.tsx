
import type { ComponentType } from "../../types/types";

type CanvasComponentProps = {
    canvasComponents: (ComponentType)[];
    setCanvasComponents: React.Dispatch<React.SetStateAction<(ComponentType)[]>>;
}

export default function Canvas({canvasComponents , setCanvasComponents}: CanvasComponentProps) {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentData = e.dataTransfer.getData("component");
    if (componentData) {
      const component: ComponentType = JSON.parse(componentData);
      setCanvasComponents((prev) => [
        ...prev,
        { ...component, instanceId: Date.now() },
      ]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };
    return(
        <div
           style={{
              display: "flex",
              flexDirection: "column",
              border: "2px dashed gray",
              height: "80vh",
              width: "50vw",          
              margin: "0.5rem",
              overflow: "auto",      
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            {canvasComponents.map((comp) => (
            <div
                key={comp.instanceId}
                style={{
                border: "1px solid blue",
                margin: "5px",
                padding: "5px",
                }}
            >
                {comp.label} #{comp.instanceId} --{comp.id}
            </div>
            ))}
        </div>
    );
}
