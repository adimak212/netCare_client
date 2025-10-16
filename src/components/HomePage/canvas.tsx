import { useState } from "react";

import type { ComponentType, CanvasComponentProps } from "../../types/types";
import { Device, PC, Router, Switch } from "../../classes/Device";

const models = {
  Switch: ["3600", "7200"],
};

const ModelToPorts: Record<string, string[]> = {
  "3600": ["f", "g", "f", "s"],
};

//const sw = new Switch(1, models.Switch[0], ModelToPorts[models.Switch[0]]);

export default function Canvas({
  canvasComponents,
  setCanvasComponents,
}: CanvasComponentProps) {
  const [connections, setConnections] = useState([]);
  const [selectedComponnent, setSelectedComponnent] = useState<number>(0);
  const [showHint, setShowHint] = useState(true);
  const [editComponnent, setEditComponnent] = useState<number | null>(null);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentData = e.dataTransfer.getData("component");
    if (componentData) {
      const component: ComponentType = JSON.parse(componentData);
      const pos = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - pos.left;
      const y = e.clientY - pos.top;

      const newClass = () => {
        switch (component.label) {
          case "PC":
            return new PC(Date.now(), x, y);
          case "Switch":
            return new Switch(Date.now(), "3600", x, y, ["f"]);
          case "Router":
            return new Router(Date.now(), "7200", x, y, ["f"]);
          default:
            return new PC(Date.now(), x, y);
        }
      };

      const classCreated = newClass();
      setCanvasComponents((prev) => [...prev, classCreated]);
      setShowHint(false);
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("id", id.toString());
  };
  const onDragEnd = (e: React.DragEvent, id: number) => {
    const rect = e.currentTarget.parentElement!.getBoundingClientRect();
    let x = e.clientX - rect.left - e.currentTarget.scrollLeft - 20;
    let y = e.clientY - rect.top - e.currentTarget.scrollTop - 20;
    console.log(x, y);
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    setCanvasComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, x: x, y: y } : comp))
    );
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const actionsClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    setSelectedComponnent((prev) => (prev === id! ? 0 : id));
  };

  const handleDelete = (id: number) => {
    setCanvasComponents((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      className="w-full h-[600px] mx-auto border-[2px] border-primary  rounded-md relative overflow-auto border-dotted flex justify-center items-center flex-col"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => {
        setSelectedComponnent(0);
        setEditComponnent(null);
      }}
    >
      {showHint && (
        <div className="flex justify-center items-center flex-col">
          <div>Drag and Drop Components Here</div>
          <div className="opacity-50 text-sm">
            Start building your network topology by dragging componnents from
            the left panel onto this canvas
          </div>
        </div>
      )}
      {canvasComponents.map((comp) => (
        <div
          className="flex flex-col items-center text-sm relative cursor-pointer"
          onClick={(e) => actionsClick(e, comp.id!)}
          key={comp.id}
          draggable
          onDragStart={(e) => onDragStart(e, comp.id!)}
          onDragEnd={(e) => onDragEnd(e, comp.id!)}
          style={{
            position: "absolute",
            left: comp.x,
            top: comp.y,
          }}
        >
          {selectedComponnent === comp.id ? (
            <div className="absolute top-0 right-[-35px] text-white rounded-md border border-blue-500 shadow-md p-2 z-50">
              <button
                className="block w-full text-xs text-left hover:bg-blue-600 rounded px-2 py-1"
                onClick={() => comp.id && setEditComponnent(comp.id)}
              >
                Edit
              </button>
              <button
                className="block w-full text-xs text-left hover:bg-red-600 rounded px-2 py-1"
                onClick={() => handleDelete(comp.id!)}
              >
                Delete
              </button>
            </div>
          ) : null}
          <img
            src={comp.icon}
            alt={`${comp.deviceType} ${comp.modelType}`}
            className="w-10 rounded-md bg-primary p-2 bg-opacity-20"
          />
          <input
            className="bg-transparent focus-within:outline-none  text-center"
            type="text"
            defaultValue={`${comp.deviceType} ${comp.modelType}`}
            disabled={editComponnent !== comp.id}
            ref={(el) => (editComponnent === comp.id ? el?.focus() : undefined)}
          />
        </div>
      ))}
    </div>
  );
}
