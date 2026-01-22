import { useState } from "react";
import { Device } from "../classes/Device";
import { PC, Switch, Router, Cloud } from "../classes/Device";
import type { ComponentType, TempLine } from "../types/types";
import { ModelToPorts } from "../config/consts";

export default function useDnd(
  setCanvasComponents: React.Dispatch<React.SetStateAction<Device[]>>,
  setTempLine: React.Dispatch<React.SetStateAction<TempLine>>,
  isConnecting: boolean,
  tempLine: TempLine
) {
  const [selectedComponnent, setSelectedComponnent] = useState<string>("");
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
            return new PC(new Date().toISOString(), x, y);
          case "Switch":
            return new Switch(new Date().toISOString(), "3600", x, y, ModelToPorts["3600"]);
          case "Router":
            return new Router(new Date().toISOString(), "7200", x, y, ModelToPorts["c7200"]);
          case "Cloud":
            return new Cloud(new Date().toISOString(), x, y);
          default:
            return new PC(new Date().toISOString(), x, y);
        }
      };

      const classCreated = newClass();
      setCanvasComponents((prev) => [...prev, classCreated]);
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id.toString());

    const emptyCanvas = document.createElement("canvas");
    emptyCanvas.width = 1;
    emptyCanvas.height = 1;

    document.body.appendChild(emptyCanvas);

    e.dataTransfer.setDragImage(emptyCanvas, 0, 0);

    setTimeout(() => document.body.removeChild(emptyCanvas), 0);
  };

  const onDragEnd = (e: React.DragEvent, id: string) => {
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
      prev.map((comp) => (comp.node_id === id ? { ...comp, x: x, y: y } : comp))
    );
    setTempLine({ ...tempLine, x1: x, y1: y });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (isConnecting) {
      return;
    } else {
      const rect = e.currentTarget.parentElement!.getBoundingClientRect();
      let x = e.clientX - rect.left - e.currentTarget.scrollLeft - 20;
      let y = e.clientY - rect.top - e.currentTarget.scrollTop - 20;
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      setCanvasComponents((prev) =>
        prev.map((comp) => (comp.node_id === id ? { ...comp, x: x, y: y } : comp))
      );
    }
  };
  return { onDrop, onDragEnd, onDrag, onDragOver, onDragStart };
}
