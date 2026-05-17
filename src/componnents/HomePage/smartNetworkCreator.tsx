import { useContext, useState, type SetStateAction } from "react";
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
import { UserContext } from "@/context/UserContext";
import UserIntentForm from "./userIntent";
import { PRIORITY, type Priority, type UserIntent } from "../../types/intent";
import { IntentWeightMapper } from "@/classes/IntentWeightMapper";

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
interface NetworkRequirements {
  pcs: number;
}

export default function smartNetworkTopology({ setPopUp }: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [ProjectName, setProjectName] = useState("");
  const [topoPick, setTopoPick] = useState<Rank | null>();
  const [errors, setErrors] = useState("");
  const { mutateAsync, data } = useRunAlgorithm();
  const {
    mutateAsync: createNodesMutate,
    data: nodesData,
    isPending: isPendingNodes,
  } = useCreateNodes();
  const { mutateAsync: createProject, isPending: isPendingProject } = useCreatProject();
  const userLocal = JSON.parse(localStorage.getItem("user") || "null");
  const { user, setUser } = useContext(UserContext);
  const [requirements, setRequirements] = useState<NetworkRequirements>({
    pcs: 0,
  });
  const [intent, setIntent] = useState<UserIntent>({
    scalability: PRIORITY.HIGH,
    redundancy: PRIORITY.MEDIUM,
    cost: PRIORITY.MEDIUM,
  });

  const generteTopology = async () => {
    const scalability = IntentWeightMapper.priorityToWeight(intent.scalability);
    const redundancy = IntentWeightMapper.priorityToWeight(intent.redundancy);
    const cost = IntentWeightMapper.priorityToWeight(intent.cost);
    console.log(scalability + " | " + redundancy + " | " + cost);
    const { pcs } = requirements;
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
    try {
      const result = await createProject({
        canvasComponents: canvasComponents,
        connections: connections,
        ProjectName: ProjectName,
        owner_id: userLocal ? userLocal._id : user?._id,
      });
      console.log(result);
      setPopUp(false);
      toast.success("project created :)", {
        duration: 1500,
        style: {
          background: "#102235",
          color: "white",
        },
      });
      navigate(`/project/${result!.project_id}`);
    } catch (error: any) {
      console.log(error.response.data.error);
      setErrors(error.response.data.error);
    }
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
            <div className="flex flex-col justify-center items-center h-[80%]">
              <div className="font-extrabold text-xl mb-3">Smart network Generator</div>
              <UserIntentForm
                requirements={requirements}
                intent={intent}
                setIntent={setIntent}
                setRequirements={setRequirements}
              />
              <button
                className="bg-primary rounded-md w-[70%] h-[12%] mt-5 font-bold"
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
          <div className="flex flex-col items-center justify-start h-[80%] mt-5">
            <span className="font-extrabold text-xl mb-3">Choose Project Name: </span>
            <input
              type="text"
              className="text-center text-black w=[40%] rounded"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className={`w-[80%] text-red-700 text-sm mt-${errors != "" ? "0" : "2"}`}>
              {errors}
            </div>
            <button
              className={`bg-primary rounded-md w-[70%] h-[10%] font-bold mb-5 mt-${errors != "" ? "2" : "5"}`}
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
