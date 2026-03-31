import pcIcon from "@/assets/icons/pc.png";
import switchIcon from "@/assets/icons/switch.png";
import routerIcon from "@/assets/icons/router.png";
import cloudIcon from "@/assets/icons/cloud.png";

class Device {
  node_id?: string;
  modelType?: string;
  icon?: string;
  x?: number;
  y?: number;
  node_type?: "ethernet_switch" | "dynamips" | "vpcs" | "cloud" | "cisco_switch" | "qemu";
  ports?: {
    port_number: number;
    short_name: string;
    adapter_number: number;
    isTaken: boolean;
    isOn: boolean;
  }[];
  name?: string;
  template_id?: string;
  status: string = "stopped";
  console?: number;
  slot1?: string;
}

class PC extends Device {
  constructor(id: string, x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.modelType = "";
    this.icon = pcIcon;
    this.node_id = id;
    this.node_type = "vpcs";
    this.ports = [
      {
        port_number: 0,
        short_name: "e0",
        adapter_number: 0,
        isTaken: false,
        isOn: false,
      },
    ];
    this.name = "PC";
    this.template_id = "19021f99-e36f-394d-b4a1-8aaa902ab9cc";
    this.slot1=""
  }
}

class Switch extends Device {
  constructor(
    id: string,
    modelType: string,
    x: number,
    y: number,
    ports?: {
      port_number: number;
      short_name: string;
      adapter_number: number;
      isTaken: boolean;
      isOn: boolean;
    }[],
  ) {
    super();
    this.x = x;
    this.y = y;
    this.icon = switchIcon;
    this.node_id = id;
    this.modelType = modelType;
    this.node_type = "qemu";
    this.ports = ports;
    this.name = "Switch";
    this.template_id = "96ff8c08-2f4c-4dc5-bfa6-79849810c400";
  }
}

class Router extends Device {
  constructor(
    id: string,
    modelType: string,
    x: number,
    y: number,
    ports?: {
      port_number: number;
      short_name: string;
      adapter_number: number;
      isTaken: boolean;
      isOn: false;
    }[],
  ) {
    super();
    this.x = x;
    this.y = y;
    this.icon = routerIcon;
    this.node_id = id;
    this.modelType = modelType;
    this.node_type = "dynamips";
    this.ports = ports;
    this.name = "Router";
    this.template_id = "f5f30ee0-8e87-4cbf-8682-17e5aae51685";
    this.slot1=""
  }
}

class Cloud extends Device {
  constructor(id: string, x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.node_id = id;
    this.ports = [
      {
        port_number: 0,
        short_name: "Etherner 2",
        adapter_number: 0,
        isTaken: false,
        isOn: false,
      },
    ];
    this.node_type = "cloud";
    this.modelType = "";
    this.icon = cloudIcon;
    this.name = "Cloud";
    this.template_id = "39e257dc-8412-3174-b6b3-0ee3ed6a43e9";
    this.slot1=""
  }
}

export { Device, PC, Switch, Router, Cloud };
