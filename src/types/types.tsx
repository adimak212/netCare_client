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
  canvasComponents: ComponentType[];
  setCanvasComponents: React.Dispatch<React.SetStateAction<ComponentType[]>>;
  isConnecting: boolean;
  setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>;
}
