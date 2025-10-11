
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
  const [ProjectName, setProjectName] = useState<string>("");

  async function SendComponnents() {
    const response = await axios.post("http://localhost:3000/createProject" , {canvasComponents , ProjectName});
    console.log(response.data);
    console.log(ProjectName);
  }

  return (
    <div style={styles.container}>
      <div>
        <SideBar componentsLibrary={componentsLibrary}/>
      </div>
      <div style={styles.CanvasConteiner}>
        <span>Enter Project Name </span>
        <input type="text" value = {ProjectName} onChange={(event) => setProjectName(event.target.value)}/>
        <Canvas canvasComponents={canvasComponents} setCanvasComponents={setCanvasComponents}/>
        <button onClick={SendComponnents}>Create Project</button>
      </div>
      <div style={{width: '11vw'}}></div>
    </div>
  )
}

export default homePage


const styles = {
  CanvasConteiner: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column' as 'column', 
  },
  container : {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100vw',
  }
}