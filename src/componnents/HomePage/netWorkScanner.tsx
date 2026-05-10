import { useContext, useState, type SetStateAction } from "react";
import closeIcon from "@/assets/icons/close.png";
import { Requirements, scanRequirements } from "@/config/topologiesDevices.js";
import { OrbitProgress } from "react-loading-indicators";
import type { AlgorithmInputs, Link , ScanInputs} from "@/types/types.js";
import type { Device } from "@/classes/Device.js";
import axios from "axios";
type Props = {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setCanvasComponents: React.Dispatch<React.SetStateAction<Device[]>>;
  setConnections: React.Dispatch<SetStateAction<Link[] | undefined>>;
};
const reqToKey: Record<typeof scanRequirements[number], keyof ScanInputs> = {
  "Network ID + S.M": "network", // וודא שזה המפתח ב-ScanInputs
  "Start IP": "start_ip",
  "Telnet Username": "userName",
  "Telnet Password": "password"
};


export default function SmartScan({ setPopUp , setCanvasComponents , setConnections }: Props) {
  const [isScanning, setInScanning] = useState(false);
  const [inputs, setInputs] = useState<ScanInputs>({
  "network" : "", 
  "start_ip" : "",
  "userName" : "",
  "password" : ""
  });
  const setField = (key: keyof ScanInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

interface ScanResponse {
  canvasComponnents: any[]; 
  connections: any[];
  summary: {
    routers: number;
    switches: number;
    pcs: number;
    total: number;
  };
}

const startScan = async () => {
  console.log("in scan");
  setInScanning(true);
  try {
    // 2. העברת הטיפוס לתוך ה-get
    const response = await axios.get<ScanResponse>("http://localhost:3000/v1/algorithm/scan", {
      params: {
        "network": inputs["network"],
        "start_ip": inputs["start_ip"],
        "userName": inputs["userName"],
        "password": inputs["password"]
      },
      timeout: 600000
    });

    setCanvasComponents(response.data.canvasComponnents);
    setConnections(response.data.connections);

  } catch (error) {
    console.error("Scan failed:", error);
  }
};

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-[100] h-[100vh] flex-col bg-black/20"
    >
      <div
        className="w-[25vw] h-[55vh] border border-1 border-primary bg-background z-[200] rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between ml-2 mt-2">
          <img
            src={closeIcon}
            alt="close"
            className="w-6 h-fit cursor-pointer"
            onClick={() => setPopUp(false)}
          />
        </div>
        {!isScanning && (
          <>
            <div className="flex flex-col justify-center items-center h-[80%]">
              <div className="font-extrabold text-xl mb-3">Smart network Generator</div>
              {scanRequirements.map((req) => {
                const key = reqToKey[req];
                const inpValue = inputs[key];
                return (
                  <div key={req} className="pt-3 flex justify-between w-[55%]">
                    <span className="mr-3 text-lg font-bold">{req}: </span>

                    <input
                      type="text"
                      value={inpValue}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setField(key, raw);
                      }}
                      className="text-center text-black w-[60%] h-8 rounded mr-5"
                    />
                  </div>
                );
              })}
              <button
                className="bg-primary rounded-md w-[70%] h-[10%] mt-5 font-bold"
                onClick={() => startScan()}
              >
                Scan My Network
              </button>
            </div>
          </>
        )}
        <div className=" flex flex-col justify-center items-center">
          {isScanning && <OrbitProgress color="#1173d4" size="medium" />}
        </div>
    </div>
    </div>
  );
}
