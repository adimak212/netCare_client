
 export type ComponentType = {
  id: string;
  label: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, component: ComponentType) => void;
  instanceId: number | null;
  node_type: string;
  x: number;
  y: number;
};