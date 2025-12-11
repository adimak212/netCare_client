import { useState } from "react";
import { Device, PC, Router, Switch, Cloud } from "../../classes/Device.js";
import axios from "axios";

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

  const generteTopology = async () => {
    let components: string[] = [];
    if (routers > 100 || switchs > 100 ||  pcs > 100 ||  scalability > 100 ||  redundancy > 100 ||  cost > 100){
      return null;
    }
    for (let i = 0; i < routers!; i++) {
      components.push("f5f30ee0-8e87-4cbf-8682-17e5aae51685");
    }
    for (let i = 0; i < pcs!; i++) {
      components.push("19021f99-e36f-394d-b4a1-8aaa902ab9cc");
    }
    for (let i = 0; i < switchs!; i++) {
      components.push("1966b864-93e7-32d5-965f-001384eec461");
    }
    for (let i = 0; i < clouds!; i++) {
      components.push("39e257dc-8412-3174-b6b3-0ee3ed6a43e9");
    }
    await axios.get("http://localhost:3000/v1/algorithm/runAlgorithm", {
      params: {
        components: components,
        scalability: scalability,
        redundancy: redundancy,
        cost: cost,
      },
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[100] h-[90vh]">
      <div className="flex flex-col justify-start items-center  w-[50vw] h-[50vh] bg-background z-[200] pt-5">
        <button onClick={() => setPopUp(false)}>close</button>
        <div>Smart network Generator</div>
        <div className="pt-3">
          <span className=" pr-2">Routers: </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            pattern="[0-9]*"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 999)) {
                e.target.value = value;
                setRouters(Number(value));
              }
            }}
            className="text-center text-black w-12 rounded"
          />
        </div>
        <div className="pt-3">
          <span className=" pr-2">Switches: </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            pattern="[0-9]*"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 999)) {
                e.target.value = value;
                setSwitchs(Number(value));
              }
            }}
            className="text-center text-black w-12 rounded"
          />{" "}
        </div>
        <div className="pt-3">
          <span className=" pr-2">Pcs: </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            pattern="[0-9]*"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 999)) {
                e.target.value = value;
                setPcs(Number(value));
              }
            }}
            className="text-center text-black w-12 rounded "
          />{" "}
        </div>
        <div className="pt-10">
          <span className=" pr-2">scalability: </span>
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
          <span className=" pr-2">redundancy: </span>
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
          <span className=" pr-2">cost: </span>
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
        <div className=" pt-5 font-extrabold text-lg">all params must be between 0 - 100</div>
        <button
          className="bg-primary rounded-md w-[80%] h-10 mt-3 font-bold"
          onClick={generteTopology}
        >
          Generate Topology and Network
        </button>
      </div>
    </div>
  );
}
