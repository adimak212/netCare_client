import { useState } from "react";
import { Device, PC, Router, Switch, Cloud } from "../../classes/Device.js";
import closeIcon from "../../assets/icons/close.png";
import axios from "axios";
import { TopologyToReq } from "../../config/topologiesDevices.js";

type Props = {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function smartNetworkTopology({ setPopUp }: Props) {
  const [routers, setRouters] = useState<number>(0);
  const [pcs, setPcs] = useState<number>(0);
  const [switchs, setSwitchs] = useState<number>(0);
  const [clouds, setCloudes] = useState<number>(0);
  const [scalability, setScalability] = useState<number>(0);
  const [redundancy, setRedundancy] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [responseInfo, setResponseInfo] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [topoPick, setTopoPick] = useState("");
  const [canvasComponents , setcanvasComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [ProjectName , setProjectName] = useState("");

  const generteTopology = async () => {
    if (
      routers > 100 ||
      switchs > 100 ||
      pcs > 100 ||
      scalability > 100 ||
      redundancy > 100 ||
      cost > 100
    ) {
      return null;
    }
    await axios
      .get("http://localhost:3000/v1/algorithm/runAlgorithm", {
        params: {
          choice: "bestfit",
          scalability: scalability,
          redundancy: redundancy,
          cost: cost,
          pcs: pcs
        },
      })
      .then((response: any) => {
        setPage(1);
        setRanks(response.data.ranks);
        console.log(response.data.ranks);
      });
  };
  const handleTopologyPick = async (topoName: string) => {
    setTopoPick(topoName);
    setPage(2);
  };

  const createNetwork = async () => {
    await axios
      .get("http://localhost:3000/v1/algorithm/runAlgorithm", {
        params: {
          choice: "build",
          topology: topoPick,
          pcs: pcs,
        },
      })
      .then((response: any) => {
        setResponseInfo(response.data.normalized);
        //setItems(response.data.packing.items)
        //console.log(response.data.packing.items);
        setPage(3);
      });
  };

  const createNodes = async () => {
    console.log(responseInfo);
    await axios
      .get("http://localhost:3000/v1/algorithm/runAlgorithm", {
        params: {
          choice: "createNodes",
          topology: topoPick,
          normalized: JSON.stringify(responseInfo)
        },
      })
      .then((response: any) => {
        //const arr = Array.from(Object.entries(response.data.comp));
        console.log(response)
        setcanvasComponents(response.data.nodes) 
        setConnections(response.data.links)
        setPage(4);
      });
  };
  const createProject = async () => {

    await axios.post("http://localhost:3000/v1/projects/createProject", {
        canvasComponents,
        ProjectName,
        connections,
      });
      setPopUp(false);
  }
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-[100] h-[100vh] flex-col bg-black/20"
      onClick={() => setPopUp(false)}
    >
      <div
        className="w-[30vw] h-[60vh] border border-1 border-primary bg-background z-[200] rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={() => setPopUp(false)}
          className="cursor-pointer flex justify-between ml-2 mt-2"
        >
          <img src={closeIcon} alt="close" className="w-6 h-fit" />
        </div>
        {page == 0 && (
          <>
            <div className="flex flex-col justify-around items-center h-[80%]">
              <div className="font-extrabold text-lg">Smart network Generator</div>
              <div className="pt-10">
                <div>
                  <span className=" pr-2 text-lg">scalability: </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
                        e.target.value = value;
                        setScalability(Number(value));
                      }
                    }}
                    className="text-center text-black w-12 rounded mr-5"
                  />{" "}
                </div>
                <div className="mt-2">
                  <span className=" pr-2 text-lg">redundancy: </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
                        e.target.value = value;
                        setRedundancy(Number(value));
                      }
                    }}
                    className="text-center text-black w-12 rounded mr-5"
                  />{" "}
                </div>
                <div className="mt-2">
                  <span className=" pr-2 text-lg">cost: </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
                        e.target.value = value;
                        setCost(Number(value));
                      }
                    }}
                    className="text-center text-black w-12 rounded "
                  />{" "}
                </div>
                <div className="mt-2">
                  <span className=" pr-2 text-lg">Pcs: </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
                        e.target.value = value;
                        setPcs(Number(value));
                      }
                    }}
                    className="text-center text-black w-12 rounded "
                  />{" "}
                </div>
              </div>
              <div className=" font-extrabold text-lg">all params must be between 0 - 100</div>
              <button
                className="bg-primary rounded-md w-[80%] h-10 mt-10 font-bold"
                onClick={generteTopology}
              >
                Generate Topology and Network
              </button>
            </div>
          </>
        )}

        {page == 1 && (
          <>
            <div className="text-xl font-extrabold text-center">Pick Topology</div>
            <div className="flex flex-col mt-10 justify-center items-center h-[50%] ">
              {ranks.map((topo: { name: string; score: number }, i) => (
                <div
                  className=" w-[70%] m-1 p-2 border border-primary border-1 rounded-md  hover:bg-primary/70 cursor-pointer text-lg font-bold"
                  onClick={() => handleTopologyPick(topo.name)}
                >
                  {i + 1}. {topo.name}
                </div>
              ))}
            </div>
          </>
        )}

        {page == 2 && (
          <>
            <div className="flex flex-col justify-center items-center h-[80%]">
              {TopologyToReq[topoPick].map((input) => {
                const [inpValue, setter] = (() => {
                  switch (input) {
                    case "Pcs":
                      return [pcs, setPcs];
                    case "Switches":
                      return [switchs, setSwitchs];
                    case "Routers":
                      return [routers, setRouters];
                    default:
                      return [pcs, setPcs];
                  }
                })();

                return (
                  <div className="pt-3 ">
                    <span className="mr-3 text-xl font-bold">{input}: </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      pattern="[0-9]*"
                      value={inpValue}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
                          e.target.value = value;
                          setter(Number(value));
                        }
                      }}
                      className="text-center text-black w-12 rounded mr-5"
                    />{" "}
                  </div>
                );
              })}
              <button
                className="bg-primary rounded-md w-[50%] h-10 mt-3 font-bold"
                onClick={() => createNetwork()}
              >
                Create Network
              </button>
            </div>
          </>
        )}
        {page == 3 && (
          <>
            <div className="flex flex-col justify-center items-center">
              {Object.entries(responseInfo).map(([compName, amount]) => (
                <div>
                  <span>
                    {compName}: {amount}
                  </span>
                </div>
              ))}
              <div className="flex mt-5 w-[90%]">
                <button className="bg-primary rounded-md w-[70%] h-10 mt-3 font-bold" onClick={() => createNodes()}>
                  Create Nodes
                </button>
                <button
                  className="bg-primary rounded-md w-[70%] h-10 ml-3 mt-3 font-bold"
                  onClick={() => setPage(1)}
                >
                  Choose Topology
                </button>
              </div>
            </div>
          </>
        )}

        {page == 4 &&(
          <div>
            <span>Choose Project Name: </span>
            <input type="text"  className="text-black ml-2" onChange={(e) => setProjectName(e.target.value)}/>
            <button onClick={() => createProject()}>Create Project</button>
          </div>
          
        )}
      </div>
    </div>
  );
}
