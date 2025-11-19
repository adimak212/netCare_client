import { useEffect, useState } from "react";
import Canvas from "../componnents/HomePage/canvas.js";
import { SideBar } from "../componnents/HomePage/sideBar.js";
import axios from "axios";
import type { Device } from "../classes/Device";
import WireImg from "../assets/icons/Wire.png";
import { useNavigate, useParams } from "react-router-dom";
import pcIcon from "../assets/icons/pc.png";
import type { Link } from "../types/types.ts";
import toast from "react-hot-toast";
import playProject from "../assets/icons/playProject.png";

function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<Device[]>([]);
  const [ProjectName, setProjectName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectMassege, setConnectMassege] = useState("Connect Componnents");
  const { id } = useParams<{ id: string }>() || "0";
  const [connections, setConnections] = useState<Link[] | undefined>([]);
  const [inProjectMassege, setinProjectMassege] = useState<string>(
    "Create GNS3 Project"
  );
  const [update, setUpdate] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setCanvasComponents([]);
      setinProjectMassege("Create GNS3 Project");
      return;
    }
    setinProjectMassege("Update Project");
    const fetchNodes = async () => {
      try {
        const devices = await axios.get<Device[]>(
          "http://localhost:3000/v1/projects/getProjectNodes",
          { params: { id } }
        );
        const links = await axios.get<Link[]>(
          "http://localhost:3000/v1/projects/getProjectLinks",
          {
            params: { id },
          }
        );
        const finalDevices = devices.data.map((device) => ({
          ...device,
          ports: device.ports?.map((port) => {
            const isTaken = links.data.some(
              (link) =>
                (link.from.adapter_number == port.adapter_number &&
                  link.from.port_number == port.port_number &&
                  link.from.node_id === device.id) ||
                (link.to.adapter_number == port.adapter_number &&
                  link.to.port_number == port.port_number &&
                  link.to.node_id === device.id)
            );
            return {
              ...port,
              isTaken: isTaken,
            };
          }),
        }));
        console.log(finalDevices);
        setCanvasComponents(finalDevices);
        console.log(links.data);
        setConnections(links.data);
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    };

    const openProject = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/v1/projects/openProject",
          {
            params: { id },
          }
        );

        console.log(res.data);
      } catch (error) {
        console.error("Error open project:", error);
      }
    };

    fetchNodes();
    openProject();
    console.log(id);
  }, [id, update]);

  const handaleConnectClick = () => {
    setIsConnecting(!isConnecting);
    setConnectMassege(isConnecting ? "Connect Componnents" : "Stop Connect");
  };

  async function SendComponnents() {
    try {
      const response = await axios.post(
        "http://localhost:3000/v1/projects/createProject",
        {
          canvasComponents,
          ProjectName,
          connections,
        }
      );
      toast.success("project created :)", {
        duration: 1500,
        style: {
          background: "#102235",
          color: "white",
        },
      });
      setCanvasComponents([]);
      setProjectName("");
    } catch (error) {
      toast.error("project didnt created!", {
        duration: 1500,
        style: {
          background: "#102235",
          color: "white",
          //border : "1px solid #1173d4"
        },
      });
      console.log(error);
    }
  }

  const updateProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/v1/projects/updateProject",
        {
          canvasComponents,
          ProjectName,
          connections,
          id,
        }
      );
      console.log(canvasComponents);
      setTimeout(()=>{
        window.location.reload();
      } , 1000);
    } catch (error) {}
  };
  return (
    <div className="w-[95%] mx-auto flex gap-10">
      <div className="mt-1 flex gap-6 h-[90vh]">
        <div>
          <div className="flex flex-col relative py-6 ">
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
          <div
            className="w-[4%] h-fit  border border-transparent
            hover:border-primary hover:border-2
             duration-500 "
          >
            <img
              src={playProject}
              alt="Play Project"
              className="w-[70%] h-fit opacity-75"
            />
            <div>start</div>
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
          {!id && (
            <input
              className="bg-transparent focus-within:outline-none w-1/2 h-10 rounded-md mr-3 mt-3 px-4 border-[1px] border-primary border-opacity-20 placeholder:text-white placeholder:opacity-60"
              type="text"
              placeholder="Project Name"
              value={ProjectName}
              onChange={(event) => setProjectName(event.target.value)}
            />
          )}
          <button
            className="bg-primary rounded-md w-1/2 h-10 mt-3 font-bold"
            onClick={id ? updateProject : SendComponnents}
          >
            {inProjectMassege}
          </button>
        </div>
      </div>
    </div>
  );
}

export default homePage;
