
import { useState } from 'react';
import Canvas from '../components/HomePage/canvas'
import type { ComponentType } from '../types/types';
import { SideBar } from '../components/HomePage/sideBar';


  const onDragStart = (e: React.DragEvent<HTMLDivElement>, component: ComponentType) => {
      e.dataTransfer.setData("component", JSON.stringify(component));
    };
  
  const componentsLibrary: ComponentType[] = [
    { id: "router", label: "Router", onDragStart,  instanceId: null },
    { id: "switch", label: "Switch", onDragStart, instanceId: null },
    { id: "pc", label: "PC", onDragStart, instanceId: null },
  ];
  

function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<ComponentType[]>([]);

  return (
    <div>
       <SideBar componentsLibrary={componentsLibrary}/>
       <Canvas canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents}/>
    </div>
  )
}

export default homePage