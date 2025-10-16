import pcIcon from "../assets/icons/pc.png";
import switchIcon from "../assets/icons/switch.png";
import routerIcon from "../assets/icons/router.png";

class Device {
  id?: number;
  modelType?: string;
  icon?: string;
  x?: number;
  y?: number;
  deviceType?: "Switch" | "Router" | "PC";
  ports?: string[];
  takenPorts?: {
    takenPort: string;
    connectedTo: { port: string; device: Device; instanceId: number };
  }[];
}

class PC extends Device {
  constructor(id: number, x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.modelType = "";
    this.icon = pcIcon;
    this.id = id;
    this.deviceType = "PC";
    this.ports = ["serial"];
  }
}

class Switch extends Device {
  constructor(
    id: number,
    modelType: string,
    x: number,
    y: number,
    ports?: string[]
  ) {
    super();
    this.x = x;
    this.y = y;
    this.icon = switchIcon;
    this.id = id;
    this.modelType = modelType;
    this.deviceType = "Switch";
    this.ports = ports;
  }
}

class Router extends Device {
  constructor(
    id: number,
    modelType: string,
    x: number,
    y: number,
    ports?: string[]
  ) {
    super();
    this.x = x;
    this.y = y;
    this.icon = routerIcon;
    this.id = id;
    this.modelType = modelType;
    this.deviceType = "Router";
    this.ports = ports;
  }
}

export { Device, PC, Switch, Router };
