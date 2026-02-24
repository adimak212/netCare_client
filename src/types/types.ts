import type { Device } from "@/classes/Device.js";

export type ComponentType = {
  id: string;
  label: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, component: ComponentType) => void;
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
  link_id: string;
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

export type TempLine = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
} | null;

export type Rank = {
  key: string;
  metrics: { scalability: number; redundancy: number; cost: number; physical_cost_raw: number };
  name: string;
  normalized: Record<string, number>;
  score: number;
};

export type RunAlgorithmResponse = {
  ranks: Rank[];
};

export type RunAlgorithmParams = {
  pcs: number;
  scalability: number;
  redundancy: number;
  cost: number;
};

export type AlgorithmInputs = {
  pcs: number;
  scalability: number;
  redundancy: number;
  cost: number;
};

export type CreateNodesResponse = {
  nodes: Device[];
  links: Link[];
};

export type CreatProjectParams = {
  canvasComponents: Device[];
  ProjectName: string;
  connections: Link[];
};

export type CreatProjectResponse = {
  project_id: string;
  nodes: Device[];
  links: Link[];
  message: string;
};
