export const models = {
  Switch: ["3600", "7200"],
};

export const ModelToPorts: Record<
  string,
  {
    port_number: number;
    adapter_number: number;
    short_name: string;
    isTaken: boolean;
    isOn: boolean;
  }[]
> = {
  "3600": [
  // Gi0
      { adapter_number: 0, port_number: 0, short_name: "Gi0/0", isTaken: false, isOn: false },
      { adapter_number: 1, port_number: 0, short_name: "Gi0/1", isTaken: false, isOn: false },
      { adapter_number: 2, port_number: 0, short_name: "Gi0/2", isTaken: false, isOn: false },
      { adapter_number: 3, port_number: 0, short_name: "Gi0/3", isTaken: false, isOn: false },

      // Gi1
      { adapter_number: 4, port_number: 0, short_name: "Gi1/0", isTaken: false, isOn: false },
      { adapter_number: 5, port_number: 0, short_name: "Gi1/1", isTaken: false, isOn: false },
      { adapter_number: 6, port_number: 0, short_name: "Gi1/2", isTaken: false, isOn: false },
      { adapter_number: 7, port_number: 0, short_name: "Gi1/3", isTaken: false, isOn: false },

      // Gi2
      { adapter_number: 8, port_number: 0, short_name: "Gi2/0", isTaken: false, isOn: false },
      { adapter_number: 9, port_number: 0, short_name: "Gi2/1", isTaken: false, isOn: false },
      { adapter_number: 10, port_number: 0, short_name: "Gi2/2", isTaken: false, isOn: false },
      { adapter_number: 11, port_number: 0, short_name: "Gi2/3", isTaken: false, isOn: false },

      // Gi3
      { adapter_number: 12, port_number: 0, short_name: "Gi3/0", isTaken: false, isOn: false },
      { adapter_number: 13, port_number: 0, short_name: "Gi3/1", isTaken: false, isOn: false },
      { adapter_number: 14, port_number: 0, short_name: "Gi3/2", isTaken: false, isOn: false },
      { adapter_number: 15, port_number: 0, short_name: "Gi3/3", isTaken: false, isOn: false },
    ] ,
  c7200: [
    {
      port_number: 0,
      adapter_number: 0,
      short_name: "f0/0",
      isTaken: false,
      isOn: false,
    },
    {
      port_number: 0,
      adapter_number: 1,
      short_name: "s1/0",
      isTaken: false,
      isOn: false,
    },
    {
      port_number: 1,
      adapter_number: 1,
      short_name: "s1/1",
      isTaken: false,
      isOn: false,
    },
    {
      port_number: 2,
      adapter_number: 1,
      short_name: "s1/2",
      isTaken: false,
      isOn: false,
    },
    {
      port_number: 3,
      adapter_number: 1,
      short_name: "s1/3",
      isTaken: false,
      isOn: false,
    },
    {
      port_number: 0,
      adapter_number: 2,
      short_name: "f2/0",
      isTaken: false,
      isOn: false,
    },
    {
      port_number: 1,
      adapter_number: 2,
      short_name: "f2/1",
      isTaken: false,
      isOn: false,
    },
  ],
};
