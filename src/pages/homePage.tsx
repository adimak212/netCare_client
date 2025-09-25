
import { useState } from 'react';
import Canvas from '../components/HomePage/canvas'
import type { ComponentType } from '../types/types';
import { SideBar } from '../components/HomePage/sideBar';
import axios from 'axios';


  const onDragStart = (e: React.DragEvent<HTMLDivElement>, component: ComponentType) => {
      e.dataTransfer.setData("component", JSON.stringify(component));
    };
  
  const componentsLibrary: ComponentType[] = [
    { id: "router", label: "Router", onDragStart,  instanceId: null },
    { id: "switch", label: "Switch", onDragStart, instanceId: null },
    { id: "pc", label: "PC", onDragStart, instanceId: null },
    { id: "cloud", label: "cloud", onDragStart, instanceId: null },
  ];
  
  
function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<ComponentType[]>([]);


  async function SendComponnents() {
    const response = await axios.post("http://localhost:3000/createProject" , {canvasComponents});
    console.log(response.data);
  }

  return (
    <div>
       <SideBar componentsLibrary={componentsLibrary}/>
       <Canvas canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents}/>
       <button onClick={SendComponnents}>send components</button>
    </div>
  )
}

export default homePage