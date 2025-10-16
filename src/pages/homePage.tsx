import { useState } from "react";
import Canvas from "../components/HomePage/canvas";
import type { ComponentType } from "../types/types";
import { SideBar } from "../components/HomePage/sideBar";
import axios from "axios";

function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<ComponentType[]>([]);
  const [ProjectName, setProjectName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handaleConnectClick = () => {
    setIsConnecting(!isConnecting);
  };

  async function SendComponnents() {
    const response = await axios.post("http://localhost:3000/createProject", {
      canvasComponents,
      ProjectName,
    });
    console.log(response.data);
    console.log(ProjectName);
  }

  return (
    // <div className='flex '>
    //   <div>
    //     <SideBar componentsLibrary={componentsLibrary}/>
    //     <button onClick={handaleConnectClick}>Connect Componnents</button>
    //   </div>
    //   <div className='flex flex-col'>
    //     <span>Enter Project Name </span>
    //     <input type="text" value = {ProjectName} onChange={(event) => setProjectName(event.target.value)}/>
    //     <Canvas
    //       canvasComponents={canvasComponents}
    //       setCanvasComponents={setCanvasComponents}
    //       isConnecting = {isConnecting}
    //       setIsConnecting={setIsConnecting}
    //      />
    //     <button onClick={SendComponnents} className='bg-primary'>Create Project</button>
    //   </div>
    //   <div></div>
    // </div>

    <div className="w-[95%] mx-auto flex gap-10">
      <div className="flex gap-6">
        <div className="flex flex-col relative py-6">
          <span className="font-bold text-2xl">Components</span>
          <SideBar />
        </div>
        <div className="w-[1px] h-screen bg-primary bg-opacity-20"></div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <input
          className="bg-transparent focus-within:outline-none w-[500px] h-10 rounded-md mt-2 mb-4 px-4 border-[1px] border-primary border-opacity-20 placeholder:text-white placeholder:opacity-60"
          type="text"
          placeholder="Project Name"
          value={ProjectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <Canvas
          canvasComponents={canvasComponents}
          setCanvasComponents={setCanvasComponents}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
        />
        <button className="bg-primary rounded-md w-1/2 h-10 mt-3 font-bold">Create GNS3 Project</button>
      </div>
    </div>
  );
}

export default homePage;
