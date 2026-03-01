import { useState, type SetStateAction } from "react";
import closeIcon from "@/assets/icons/close.png";
import { Requirements } from "@/config/topologiesDevices.js";
import { OrbitProgress } from "react-loading-indicators";
import { useRunAlgorithm } from "@/hooks/useRunAlgorithm .js";
import type { AlgorithmInputs, Link, Rank } from "@/types/types.js";
import { useCreateNodes } from "@/hooks/useCreateNodes.js";
import { useCreatProject } from "@/hooks/useCreatProject.js";
import toast from "react-hot-toast";
import type { Device } from "@/classes/Device.js";
import { useNavigate } from "react-router-dom";

type Props = {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setCanvasComponents: React.Dispatch<React.SetStateAction<Device[]>>;
  setConnections: React.Dispatch<SetStateAction<Link[] | undefined>>;
};
const reqToKey: Record<(typeof Requirements)[number], keyof AlgorithmInputs> = {
  Pcs: "pcs",
  Scalabillity: "scalability",
  Redundancy: "redundancy",
  Cost: "cost",
};
export default function smartNetworkTopology({ setPopUp }: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [ProjectName, setProjectName] = useState("");
  const [topoPick, setTopoPick] = useState<Rank | null>();
  const { mutateAsync, data } = useRunAlgorithm();
  const {
    mutateAsync: createNodesMutate,
    data: nodesData,
    isPending: isPendingNodes,
  } = useCreateNodes();
  const { mutateAsync: createProject, isPending: isPendingProject } = useCreatProject();

  const [inputs, setInputs] = useState<AlgorithmInputs>({
    pcs: 0,
    scalability: 0,
    redundancy: 0,
    cost: 0,
  });

  const setField = (key: keyof AlgorithmInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  const generteTopology = async () => {
    const { pcs, scalability, redundancy, cost } = inputs;
    if (
      inputs.pcs > 100 ||
      inputs.scalability > 100 ||
      inputs.redundancy > 100 ||
      inputs.cost > 100
    )
      return;
    const result = await mutateAsync({ pcs, scalability, redundancy, cost });
    setPage(1);
    console.log(result.ranks);
  };
  const createNodes = async () => {
    const result = await createNodesMutate({
      topoPick: topoPick!.name,
      responseInfo: topoPick!.normalized,
    });
    setPage(3);
    console.log(result.links);
  };
  const onCreateProject = async () => {
    const result = await createProject({
      canvasComponents: canvasComponents,
      connections: connections,
      ProjectName: ProjectName,
    });
    setPopUp(false);
    //console.log(result);
    toast.success("project created :)", {
      duration: 1500,
      style: {
        background: "#102235",
        color: "white",
      },
    });
    navigate(`/${result.project_id}`);
  };
  const ranks = data?.ranks ?? [];
  const canvasComponents = nodesData?.nodes ?? [];
  const connections = nodesData?.links ?? [];
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-[100] h-[100vh] flex-col bg-black/20"
      onClick={() => setPopUp(false)}
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
        {page == 0 && (
          <>
            <div className="flex flex-col justify-center items-center h-[70%]">
              <div className="font-extrabold text-xl mb-3">Smart network Generator</div>
              {Requirements.map((req) => {
                const key = reqToKey[req];
                const inpValue = inputs[key];
                return (
                  <div key={req} className="pt-3 flex justify-between w-[55%]">
                    <span className="mr-3 text-lg font-bold">{req}: </span>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      pattern="[0-9]*"
                      value={inpValue === 0 ? "" : String(inpValue)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        if (raw === "") {
                          setField(key, 0);
                          return;
                        }
                        const n = Number(raw);
                        if (n >= 0 && n <= 100) setField(key, n);
                      }}
                      className="text-center text-black w-12 rounded mr-5"
                    />
                  </div>
                );
              })}
              <div className="font-bold mt-3"> All Parameters Must Be Between 0 - 100</div>
              <button
                className="bg-primary rounded-md w-[70%] h-[13%] mt-5 font-bold"
                onClick={() => generteTopology()}
              >
                Generte Topology Ranks
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
                  className="w-[70%] m-1 p-2 border border-primary border-1 rounded-md text-base font-bold space-y-6 hover:bg-primary/70 cursor-pointer"
                  onClick={() => {
                    setTopoPick(ranks.find((top) => top.name === topo.name) || null);
                    console.log(topoPick?.normalized);
                    setPage(2);
                  }}
                >
                  {i + 1}. {topo.name}
                </div>
              ))}
            </div>
          </>
        )}
        {page == 2 && (
          <>
            <div className="flex flex-col justify-center items-center">
              <div className="font-extrabold text-xl mb-3">Componnents List</div>
              {topoPick! &&
                Object.entries(topoPick.normalized).map(([compName, amount]) => (
                  <div key={compName} className="pt-3 flex justify-between w-[55%]">
                    <span className="mr-3 text-lg font-bold">
                      {compName}: {amount}
                    </span>
                  </div>
                ))}
              <div className="flex mt-5 w-[90%]">
                <button
                  className="bg-primary rounded-md w-[70%] h-10 mt-3 font-bold"
                  onClick={createNodes}
                  disabled={isPendingNodes}
                >
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
        {page == 3 && (
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-xl mb-3">Choose Project Name: </span>
            <input
              type="text"
              className="text-black ml-2"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button
              className="bg-primary rounded-md w-[70%] h-[13%] mt-10 font-bold mb-10"
              onClick={() => onCreateProject()}
            >
              Create Project
            </button>
            {isPendingProject && <OrbitProgress color="#1173d4" size="medium" />}
          </div>
        )}
      </div>
    </div>
  );
}
