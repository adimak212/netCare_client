import { useEffect, useState } from "react";
import Canvas from "../componnents/HomePage/canvas.js";
import { SideBar } from "../componnents/HomePage/sideBar.js";
import axios from "axios";
import type { Device } from "../classes/Device";
import WireImg from "../assets/icons/Wire.png";
import { useParams } from "react-router-dom";
import pcIcon from "../assets/icons/pc.png";

function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<Device[]>([]);
  const [ProjectName, setProjectName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectMassege, setConnectMassege] = useState("Connect Componnents");
  const { id } = useParams<{ id: string }>() || "0";
  const [connections, setConnections] = useState<
    | {
        from: {
          port: string;
          device: Device;
          instanceId: number;
          index?: number;
          port_number?: number;
          adapter_number: number;
        };
        to: {
          port: string;
          device: Device;
          instanceId: number;
          index?: number;
          port_number?: number;
          adapter_number: number;
        };
      }[]
    | undefined
  >([]);

  useEffect(() => {
    if (!id) return;
    const fetchNodes = async () => {
      try {
        const response = await axios.get<Device[]>(
          "http://localhost:3000/getNodes",
          { params: { id } }
        );
        console.log(response.data);
        setCanvasComponents(response.data);
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    };
    const openProject = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/openProject`, {
          params: { id },
        });
        console.log(res.data);
      } catch (error) {
        console.error("Error open project:", error);
      }
    };

    fetchNodes();
    openProject();
    console.log(id);
  }, [id]);

  const handaleConnectClick = () => {
    setIsConnecting(!isConnecting);
    setConnectMassege(isConnecting ? "Connect Componnents" : "Stop Connect");
  };

  async function SendComponnents() {
    console.log(connections);
    const response = await axios.post("http://localhost:3000/createProject", {
      canvasComponents,
      ProjectName,
      connections,
    });
    // console.log(response.data);
    // console.log(ProjectName);
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
          <div
            className="flex items-center gap-4 bg-background py-4 pr-6 pl-3 rounded-md w-56 mt-4 cursor-pointer"
            onClick={handaleConnectClick}
          >
            <img
              src={WireImg}
              alt="wire_icon"
              className="w-10 rounded-md bg-primary p-2 bg-opacity-20"
            />
            {connectMassege}
          </div>
        </div>
        <div className="w-[1px] h-90vh bg-primary bg-opacity-20"></div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="flex justify-start w-full">
          <div className="w-[4%] h-fit hover:bg-background">
            <img src={pcIcon} alt="Play Project" className="w-[100%] h-fit" />
          </div>
        </div>
        <Canvas
          canvasComponents={canvasComponents}
          setCanvasComponents={setCanvasComponents}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
          setConnections={setConnections}
          connections={connections}
        />
        <div className="flex justify-around w-full ">
          <input
            className="bg-transparent focus-within:outline-none w-1/2 h-10 rounded-md mr-3 mt-3 px-4 border-[1px] border-primary border-opacity-20 placeholder:text-white placeholder:opacity-60"
            type="text"
            placeholder="Project Name"
            value={ProjectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
          <button
            className="bg-primary rounded-md w-1/2 h-10 mt-3 font-bold"
            onClick={SendComponnents}
          >
            Create GNS3 Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default homePage;
