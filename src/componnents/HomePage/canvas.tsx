import { useState, useRef, useEffect } from "react";
import type { ComponentType, CanvasComponentProps } from "../../types/types.js";
import { Device, PC, Router, Switch, Cloud } from "../../classes/Device.js";
import pcIcon from "../../assets/icons/pc.png";
import switchIcon from "../../assets/icons/switch.png";
import routerIcon from "../../assets/icons/router.png";
import cloudIcon from "../../assets/icons/cloud.png";
import { models, ModelToPorts } from "../../types/consts";

const iconMap: Record<string, string> = {
  ethernet_switch: switchIcon,
  dynamips: routerIcon,
  vpcs: pcIcon,
  cloud: cloudIcon,
};

export default function Canvas({
  canvasComponents,
  setCanvasComponents,
  isConnecting,
  setIsConnecting,
  setConnections,
  connections,
}: CanvasComponentProps) {
  const [selectedComponnent, setSelectedComponnent] = useState<string>("");
  const [editComponnent, setEditComponnent] = useState<string | null>(null);
  const [selectedPort, setSelectedPort] = useState<{
    port: string;
    node_id: string;
    port_number?: number;
    adapter_number: number;
  } | null>(null);

  const [tempLine, setTempLine] = useState<{
    x1?: number;
    x2?: number;
    y1?: number;
    y2?: number;
  } | null>(null);
  const [isdrowing, setIsDrowing] = useState(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentData = e.dataTransfer.getData("component");
    if (componentData) {
      const component: ComponentType = JSON.parse(componentData);
      const pos = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - pos.left;
      const y = e.clientY - pos.top;

      const newClass = () => {
        switch (component.label) {
          case "PC":
            return new PC(new Date().toISOString(), x, y);
          case "Switch":
            return new Switch(new Date().toISOString(), "3600", x, y, ModelToPorts["3600"]);
          case "Router":
            return new Router(new Date().toISOString(), "7200", x, y, ModelToPorts["c7200"]);
          case "Cloud":
            return new Cloud(new Date().toISOString(), x, y);
          default:
            return new PC(new Date().toISOString(), x, y);
        }
      };

      const classCreated = newClass();
      setCanvasComponents((prev) => [...prev, classCreated]);
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id.toString());

    const emptyCanvas = document.createElement("canvas");
    emptyCanvas.width = 1;
    emptyCanvas.height = 1;

    document.body.appendChild(emptyCanvas);

    e.dataTransfer.setDragImage(emptyCanvas, 0, 0);

    setTimeout(() => document.body.removeChild(emptyCanvas), 0);
  };

  const onDragEnd = (e: React.DragEvent, id: string) => {
    const rect = e.currentTarget.parentElement!.getBoundingClientRect();
    let x = e.clientX - rect.left - e.currentTarget.scrollLeft - 20;
    let y = e.clientY - rect.top - e.currentTarget.scrollTop - 20;
    console.log(x, y);
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    setCanvasComponents((prev) =>
      prev.map((comp) => (comp.node_id === id ? { ...comp, x: x, y: y } : comp))
    );
    setTempLine({ ...tempLine, x1: x, y1: y });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (isConnecting) {
      return;
    } else {
      const rect = e.currentTarget.parentElement!.getBoundingClientRect();
      let x = e.clientX - rect.left - e.currentTarget.scrollLeft - 20;
      let y = e.clientY - rect.top - e.currentTarget.scrollTop - 20;
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      setCanvasComponents((prev) =>
        prev.map((comp) => (comp.node_id === id ? { ...comp, x: x, y: y } : comp))
      );
    }
  };

  const actionsClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    setSelectedComponnent((prev) => (prev === id! ? "" : id));
  };

  const handleDelete = (id: string) => {
    setCanvasComponents((prev) => prev.filter((p) => p.node_id !== id));
    connections?.map(con => {
      if(con.from.node_id === id ){
        deleteConnection(con.from.adapter_number , con.from.port_number! , con.from.node_id);
      }
      if(con.to.node_id === id ){
        deleteConnection(con.to.adapter_number , con.to.port_number! , con.to.node_id);
      }
    })
  };

  const takePort = async (
    takenPort: number,
    compIndex: number,
    connectedTo: {
      port: string;
      device: Device;
      node_id: string;
      port_number: number;
      index?: number;
      adapter_number: number;
    }
  ) => {
    if (!selectedPort) {
      setSelectedPort(connectedTo);
      setIsDrowing(true);
      setTempLine({
        x1: connectedTo.device.x!,
        y1: connectedTo.device.y!,
        x2: connectedTo.device.x! + 20,
        y2: connectedTo.device.y! + 20,
      });
    } else if (selectedPort.node_id !== connectedTo.node_id) {
      setConnections((prevConnections) => [
        ...prevConnections!,
        {
          from: selectedPort,
          to: connectedTo,
          link_id: new Date().toISOString(),
        },
      ]);
      setCanvasComponents((prev) =>
        prev.map((device) => {
          if (device.node_id !== connectedTo.node_id) {
            return device;
          }

          return {
            ...device,
            ports: device.ports!.map((port) => {
              if (
                port.adapter_number === connectedTo.adapter_number &&
                port.port_number === connectedTo.port_number
              ) {
                return {
                  ...port,
                  isTaken: true,
                };
              }

              return port;
            }),
          };
        })
      );
      setCanvasComponents((prev) =>
        prev.map((device) => {
          if (device.node_id !== selectedPort.node_id) {
            return device;
          }

          return {
            ...device,
            ports: device.ports!.map((port) => {
              if (
                port.adapter_number === selectedPort.adapter_number &&
                port.port_number === selectedPort.port_number
              ) {
                return {
                  ...port,
                  isTaken: true,
                };
              }
              return port;
            }),
          };
        })
      );

      setSelectedPort(null);
      setIsDrowing(false);
      setTempLine(null);
    }

    console.log(connections);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svgRect = e.currentTarget;
    const pt = svgRect.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursor = pt.matrixTransform(svgRect.getScreenCTM()?.inverse());
    //console.log(e);
    setTempLine({ ...tempLine, x2: cursor.x, y2: cursor.y });
  };

  const deleteConnection = async (adapter_number: number, port_number: number, node_id: string) => {
    const removedConnections = connections?.find((con) => {
      const isFromMatch =
        con.from.adapter_number === adapter_number &&
        con.from.port_number === port_number &&
        con.from.node_id === node_id;

      const isToMatch =
        con.to.adapter_number === adapter_number &&
        con.to.port_number === port_number &&
        con.to.node_id === node_id;

      return isFromMatch || isToMatch;
    });

    setConnections((prev) => prev?.filter((con) => con !== removedConnections));
    setCanvasComponents((prev) => {
      return prev.map((device) => {
        const isHara =
          device.node_id === removedConnections?.from.node_id ||
          device.node_id === removedConnections?.to.node_id;
        if (!isHara) return device;

        return {
          ...device,
          ports: device.ports?.map((port) => {
            if (
              (port.adapter_number == removedConnections?.from.adapter_number &&
                port.port_number == removedConnections.from.port_number) ||
              (port.adapter_number == removedConnections?.to.adapter_number &&
                port.port_number == removedConnections.to.port_number)
            ) {
              return { ...port, isTaken: false };
            }
            return { ...port };
          }),
        };
      });
    });
  };

  return (
    <div
      className="w-full h-[530px] mx-auto border-[2px] border-primary  rounded-md relative overflow-auto border-dotted flex justify-center items-center flex-col"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => {
        setSelectedComponnent("");
        setEditComponnent(null);
      }}
    >
      {canvasComponents.length === 0 && (
        <div className="flex justify-center items-center flex-col">
          <div>Drag and Drop Components Here</div>
          <div className="opacity-50 text-sm">
            Start building your network topology by dragging componnents from the left panel onto
            this canvas
          </div>
        </div>
      )}
      {canvasComponents.map((comp) => (
        <div
          className="flex flex-col items-center text-sm relative cursor-pointer w-10 shadow-none"
          onClick={(e) => actionsClick(e, comp.node_id!)}
          key={comp.node_id}
          draggable
          onDragStart={(e) => onDragStart(e , comp.node_id!)}
          onDrag={(e) => {
            onDrag(e, comp.node_id!);
          }}
          style={{
            position: "absolute",
            left: comp.x,
            top: comp.y,
          }}
        >
          {!isConnecting && selectedComponnent === comp.node_id ? (
            <div className="absolute top-0 right-[-100px] text-white rounded-md border border-blue-500 shadow-md p-2 z-50">
              <button
                className="block w-full text-xs text-left hover:bg-blue-600 rounded px-2 py-1"
                onClick={() => comp.node_id && setEditComponnent(comp.node_id)}
              >
                Edit
              </button>
              <button
                className="block w-full text-xs text-left hover:bg-red-600 rounded px-2 py-1"
                onClick={() => handleDelete(comp.node_id!)}
              >
                Delete
              </button>
            </div>
          ) : null}
          {isConnecting && selectedComponnent === comp.node_id ? (
            <div className="absolute top-0 right-[-80px] text-white rounded-md border border-blue-500 shadow-md p-2 z-50">
              {comp.ports?.map((port, index) => (
                <div
                  className="flex items-center  hover:bg-blue-600 rounded px-2 py-1 z-[100]"
                  key={port.short_name}
                  onClick={() => {
                    comp.ports?.some((tp) => tp.short_name === port.short_name && tp.isTaken)
                      ? deleteConnection(port.adapter_number, port.port_number, comp.node_id!)
                      : takePort(
                          index,
                          canvasComponents.findIndex((c) => c.node_id === comp.node_id),
                          {
                            port: port.short_name,
                            device: comp,
                            node_id: comp.node_id!,
                            port_number: port.port_number,
                            adapter_number: port.adapter_number,
                            index: canvasComponents.findIndex((c) => c.node_id === comp.node_id),
                          }
                        );
                  }}
                >
                  <div
                    className={`w-3 h-2 rounded-full ${
                      comp.ports?.some((tp) => tp.short_name === port.short_name && tp.isTaken)
                        ? "bg-red-500"
                        : "bg-green-500"
                    } mr-1`}
                  ></div>
                  <div key={index} className="block w-full text-xs text-left cursor-pointer">
                    {port.short_name}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <img
            src={iconMap[comp.node_type!]}
            alt={`${comp.node_type} ${comp.modelType}`}
            className="w-10 rounded-md bg-primary p-2 bg-opacity-20 z-50"
          />
          <input
            className="bg-transparent focus-within:outline-none  text-center z-10"
            type="text"
            defaultValue={`${comp.name}`}
            disabled={editComponnent !== comp.node_id}
            ref={(el) => (editComponnent === comp.node_id ? el?.focus() : undefined)}
          />
        </div>
      ))}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-10"
        onMouseMove={handleMouseMove}
      >
        {connections!.map((conn, idx) => {
          const from = canvasComponents.find((c) => c.node_id === conn.from.node_id);
          const to = canvasComponents.find((c) => c.node_id === conn.to.node_id);
          if (!from || !to) return null;
          const x1 = from.x! + 20;
          const y1 = from.y! + 20;
          const x2 = to.x! + 20;
          const y2 = to.y! + 20;

          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="cyan"
              strokeWidth="2"
              className="opacity-80"
            />
          );
        })}
        {isdrowing && tempLine && (
          <line
            x1={tempLine.x1! + 20}
            x2={tempLine.x2}
            y1={tempLine.y1! + 20}
            y2={tempLine.y2}
            stroke="cyan"
            strokeWidth="2"
            className="opacity-80"
          />
        )}
      </svg>
    </div>
  );
}
