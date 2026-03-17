import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CreateNodesResponse } from "@/types/types";

type CreateNodesVars = {
  topoPick: unknown;
  responseInfo: unknown;
};

export function useCreateNodes() {
  return useMutation({
    mutationFn: async ({ topoPick, responseInfo }: CreateNodesVars) => {
      console.log(responseInfo)
      const res = await axios.get<CreateNodesResponse>(
        "http://localhost:3000/v1/algorithm/runAlgorithm",
        {
          params: {
            choice: "createNodes",
            topology: topoPick,
            normalized: JSON.stringify(responseInfo),
          },
        },
      );
      return res.data;
    },
  });
}
