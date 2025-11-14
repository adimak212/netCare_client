import type { Device } from "../classes/Device.js";

export type ComponentType = {
  id: string;
  label: string;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    component: ComponentType
  ) => void;
  node_id: string | null;
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
          node_id: string;
          port_number?: number;
          adapter_number: number;
        };
        to: {
          node_id: string;
          port_number?: number;
          adapter_number: number;
        };
      }[]
    | undefined;
  setConnections: React.Dispatch<React.SetStateAction<Link[] | undefined>>;
}

export type Project = {
  name: string;
  project_id: string;
};

export type Link = {
  from: {
    node_id: string;
    port_number?: number;
    adapter_number: number;
  };
  to: {
    node_id: string;
    port_number?: number;
    adapter_number: number;
  };
};
