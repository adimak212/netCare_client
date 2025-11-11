import type { Device } from "../classes/Device";

export type ComponentType = {
  id: string;
  label: string;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    component: ComponentType
  ) => void;
  instanceId: number | null;
  x?: number;
  y?: number;
  icon: string;
};

// סוג הפרופס של הקומפוננטה Canvas
export interface CanvasComponentProps {
  canvasComponents: Device[];
  setCanvasComponents: React.Dispatch<React.SetStateAction<Device[]>>;
  isConnecting: boolean;
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>;
  connections:
    | {
        from: {
          port: string;
          device: Device;
          instanceId: number;
          port_number?: number;
          index?: number;
          adapter_number: number;
        };
        to: {
          port: string;
          device: Device;
          instanceId: number;
          port_number?: number;
          index?: number;
          adapter_number: number;
        };
      }[]
    | undefined;
  setConnections: React.Dispatch<
    React.SetStateAction<
      | {
          from: {
            port: string;
            device: Device;
            instanceId: number;
            port_number?: number;
            index?: number;
            adapter_number: number;
          };
          to: {
            port: string;
            device: Device;
            instanceId: number;
            port_number?: number;
            index?: number;
            adapter_number: number;
          };
        }[]
      | undefined
    >
  >;
}

export type Project = {
  name: string;
  project_id: string;
};
