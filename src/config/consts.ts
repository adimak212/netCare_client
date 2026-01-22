export const models = {
  Switch: ["3600", "7200"]
};

export const ModelToPorts: Record<string,  {
    link_type: string,
    port_number: number,
    adapter_number: number,
    short_name:string
    isTaken : boolean
  }[]> = {
  "3600": [
    {
      link_type: "ethernet",
      port_number: 0,
      adapter_number: 0,
      short_name:"e0",
      isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 1,
      adapter_number: 0,
      short_name:"e1",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 2,
      adapter_number: 0,
      short_name:"e2",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 3,
      adapter_number: 0,
      short_name:"e3",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 4,
      adapter_number: 0,
      short_name:"e4",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 5,
      adapter_number: 0,
      short_name:"e5",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 6,
      adapter_number: 0,
      short_name:"e6",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 7,
      adapter_number: 0,
      short_name:"e7",
       isTaken : false
    } ,
],
"c7200" : [
    {
      link_type: "ethernet",
      port_number: 0,
      adapter_number: 0,
      short_name:"f0/0",
       isTaken : false
    } ,
    {
      link_type: "serial",
      port_number: 0,
      adapter_number: 1,
      short_name:"s1/0",
       isTaken : false
    } ,
    {
      link_type: "serial",
      port_number: 1,
      adapter_number: 1,
      short_name:"s1/1",
       isTaken : false
    } ,
    {
      link_type: "serial",
      port_number: 2,
      adapter_number: 1,
      short_name:"s1/2",
       isTaken : false
    } ,
    {
      link_type: "serial",
      port_number: 3,
      adapter_number: 1,
      short_name:"s1/3",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 0,
      adapter_number: 2,
      short_name:"f2/0",
       isTaken : false
    } ,
    {
      link_type: "ethernet",
      port_number: 1,
      adapter_number: 2,
      short_name:"f2/1",
       isTaken : false
    } ,
]
};
