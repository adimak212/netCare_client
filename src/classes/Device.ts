import pcIcon from "../assets/icons/pc.png";
import switchIcon from "../assets/icons/switch.png";
import routerIcon from "../assets/icons/router.png";
import cloudIcon from "../assets/icons/cloud.png";

class Device {
  id?: string;
  modelType?: string;
  icon?: string;
  x?: number;
  y?: number;
  deviceType?: "ethernet_switch" | "dynamips" | "vpcs" | "cloud";
  ports?: {
    link_type: string;
    port_number: number;
    short_name: string;
    adapter_number: number;
    isTaken : boolean
  }[];
  name?: string;
}

class PC extends Device {
  constructor(id: string, x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.modelType = "";
    this.icon = pcIcon;
    this.id = id;
    this.deviceType = "vpcs";
    this.ports = [
      {
        link_type: "ethernet",
        port_number: 0,
        short_name: "e0",
        adapter_number: 0,
        isTaken : false
      },
    ];
    this.name = "PC";
  }
}

class Switch extends Device {
  constructor(
    id: string,
    modelType: string,
    x: number,
    y: number,
    ports?: {
      link_type: string;
      port_number: number;
      short_name: string;
      adapter_number: number;
      isTaken : boolean;
    }[]
  ) {
    super();
    this.x = x;
    this.y = y;
    this.icon = switchIcon;
    this.id = id;
    this.modelType = modelType;
    this.deviceType = "ethernet_switch";
    this.ports = ports;
    this.name = "Switch";
  }
}

class Router extends Device {
  constructor(
    id: string,
    modelType: string,
    x: number,
    y: number,
    ports?: {
      link_type: string;
      port_number: number;
      short_name: string;
      adapter_number: number;
      isTaken : boolean;
    }[]
  ) {
    super();
    this.x = x;
    this.y = y;
    this.icon = routerIcon;
    this.id = id;
    this.modelType = modelType;
    this.deviceType = "dynamips";
    this.ports = ports;
    this.name = "Router";
  }
}

class Cloud extends Device {
  constructor(id: string, x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.id = id;
    this.ports = [
      {
        link_type: "ethernet",
        port_number: 0,
        short_name: "Etherner 2",
        adapter_number: 0,
        isTaken : false
      },
    ];
    this.deviceType = "cloud";
    this.modelType = "";
    this.icon = cloudIcon;
    this.name = "Cloud";
  }
}

export { Device, PC, Switch, Router, Cloud };
