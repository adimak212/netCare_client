import { useState } from "react";
import Canvas from "../components/HomePage/canvas";
import { SideBar } from "../components/HomePage/sideBar";
import axios from "axios";
import type { Device } from "../classes/Device";
import wireIcon from "../assets/icons/wire.png";

function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<Device[]>([]);
  const [ProjectName, setProjectName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectMassege , setConnectMassege] = useState ("Connect Componnents");

  const handaleConnectClick = () => {
    setIsConnecting(!isConnecting);
    setConnectMassege (isConnecting ? "Connect Componnents" : "Stop Connect"); ;
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
    <div className="w-[95%] mx-auto flex gap-10">
      <div className="flex gap-6">
        <div>
          <div className="flex flex-col relative py-6">
            <span className="font-bold text-2xl">Components</span>
            <SideBar />
          </div>
          <div className="w-full h-[1px] bg-primary bg-opacity-20"></div>
          <div className= "flex items-center gap-4 bg-bgSex py-4 pr-6 pl-3 rounded-md w-56 mt-4 cursor-pointer" onClick={handaleConnectClick}>
              <img src={wireIcon} alt="wire_icon" className="w-10 rounded-md bg-primary p-2 bg-opacity-20" />
              {connectMassege}
          </div>
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
        <button className="bg-primary rounded-md w-1/2 h-10 mt-3 font-bold">
          Create GNS3 Project
        </button>
      </div>
    </div>
  );
}

export default homePage;
