import { useEffect, useState } from "react";
import Canvas from "@/componnents/HomePage/canvas.js";
import { SideBar } from "@/componnents/HomePage/sideBar.js";
import axios from "axios";
import { Device } from "@/classes/Device";
import WireImg from "@/assets/icons/Wire.png";
import { useParams } from "react-router-dom";
import type { Link } from "@/types/types.ts";
import toast from "react-hot-toast";
import playProject from "@/assets/icons/playProject.png";
import stopProjectImg from "@/assets/icons/stopProject.png";
import AI from "@/assets/icons/AI.png";
import SmartNetworkTopology from "@/componnents/HomePage/smartNetworkCreator.tsx";

function homePage() {
  const [canvasComponents, setCanvasComponents] = useState<Device[]>([]);
  const [ProjectName, setProjectName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectMassege, setConnectMassege] = useState("Connect Componnents");
  const { id } = useParams<{ id: string }>() || "0";
  const [connections, setConnections] = useState<Link[] | undefined>([]);
  const [inProjectMassege, setinProjectMassege] = useState<string>("Create GNS3 Project");
  const [isProjectRunning , setIsProjectRunning] = useState<boolean>(false);
  const [popUp, setPopUp] = useState(false);
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
          { params: { id } },
        );
        const links = await axios.get<Link[]>("http://localhost:3000/v1/projects/getProjectLinks", {
          params: { id },
        });
        const finalDevices = devices.data.map((device) => ({
          ...device,
          ports: device.ports?.map((port) => {
            const isTaken = links.data.some(
              (link) =>
                (link.from.adapter_number == port.adapter_number &&
                  link.from.port_number == port.port_number &&
                  link.from.node_id === device.node_id) ||
                (link.to.adapter_number == port.adapter_number &&
                  link.to.port_number == port.port_number &&
                  link.to.node_id === device.node_id),
            );
            return {
              ...port,
              isTaken: isTaken,
              isOn: device.status === "started",
            };
          }),
        }));
        console.log(finalDevices);
        setCanvasComponents(finalDevices);
        console.log(links.data);
        setConnections(links.data);
        openProject();
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    };

    const openProject = async () => {
      try {
        const res = await axios.post("http://localhost:3000/v1/projects/openProject", {
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

  const checkNodes = async () => {
    try {
      const res = await axios.get<Device[]>("http://localhost:3000/v1/projects/getProjectNodes", {
        params: { id },
      });
      const finalDevices = res.data.map((device) => ({
        ...device,
        ports: device.ports?.map((port) => {
          return {
            ...port,
            isOn: device.status === "started",
          };
        }),
      }));
      setCanvasComponents(finalDevices);
    } catch (error) {
      console.error("Error check nodes in project:", error);
    }
  };

  const handaleConnectClick = () => {
    setIsConnecting(!isConnecting);
    setConnectMassege(isConnecting ? "Connect Componnents" : "Stop Connect");
  };

  const startProject = async () => {
    try {
      const res = await axios.post("http://localhost:3000/v1/projects/startProject", {
        params: { id },
      });
      console.log(res.data);
      setIsProjectRunning(true)
      checkNodes();
    } catch (error) {
      console.error("Error start project:", error);
    }
  };

  const stopProject = async () => {
    try {
      const res = await axios.post("http://localhost:3000/v1/projects/stopProject", {
        params: { id },
      });
      console.log(res.data);
      setIsProjectRunning(false)
      checkNodes();
    } catch (error) {
      console.error("Error Stopping project:", error);
    }
  };

  async function SendComponnents() {
    try {
      await axios.post("http://localhost:3000/v1/projects/createProject", {
        canvasComponents,
        ProjectName,
        connections,
      });
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
      const { data, status } = await axios.post<{
        devicesArray: typeof canvasComponents;
        linksArray: typeof connections;
      }>("http://localhost:3000/v1/projects/updateProject", {
        canvasComponents,
        connections,
        id,
      });
      console.log(connections, data.linksArray);

      setCanvasComponents(data.devicesArray);
      setConnections(data.linksArray);
      if (status == 200) {
        toast.success("project updated :)", {
          duration: 1500,
          style: {
            background: "#102235",
            color: "white",
          },
        });
      } else {
        toast.error("project didnt updated!", {
          duration: 1500,
          style: {
            background: "#102235",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
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
        <div className="flex w-full items-center">
          <div
            className="flex bg-primary rounded-md w-[15%] h-[60%] items-center justify-center mr-3 cursor-pointer"
            onClick={() => setPopUp(true)}
          >
            <img src={AI} className="w-[15%] mr-2" />
            <button className="font-bold">Create With AI</button>
          </div>
          <div className="flex justify-start w-[6%]">
            <div
              className="flex flex-col items-center justify-center w-full h-fit  border border-transparent border-#101922
            hover:border-primary 
             duration-500 rounded-md"
              onClick={startProject}
            >
              <img src={playProject} alt="Play Project" className="w-[70%] h-fit opacity-75" />
              <div>Start</div>
            </div>
          </div>
          <div className="flex justify-start w-[6%]">
            <div
              className="flex flex-col items-center justify-center w-full h-fit  border border-transparent border-#101922
            hover:border-primary
             duration-500 rounded-md"
              onClick={stopProject}
            >
              <img src={stopProjectImg} alt="Play Project" className="w-[70%] h-fit opacity-75" />
              <div>Stop</div>
            </div>
          </div>
        </div>
        <Canvas
          canvasComponents={canvasComponents}
          setCanvasComponents={setCanvasComponents}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
          setConnections={setConnections}
          connections={connections}
          isProjectRunning={isProjectRunning}
          setIsProjectRunning={setIsProjectRunning}
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
      {popUp && (
        <SmartNetworkTopology
          setPopUp={setPopUp}
          setCanvasComponents={setCanvasComponents}
          setConnections={setConnections}
        />
      )}
    </div>
  );
}

export default homePage;
