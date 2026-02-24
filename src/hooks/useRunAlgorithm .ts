import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { RunAlgorithmResponse, RunAlgorithmParams } from "@/types/types";

export const useRunAlgorithm = () =>
  useMutation({
    mutationFn: async (params: RunAlgorithmParams) => {
      const res = await axios.get<RunAlgorithmResponse>(
        "http://localhost:3000/v1/algorithm/runAlgorithm",
        {
          params: {
            choice: "bestfit",
            ...params,
          },
        },
      );
      return res.data;
    },
  });
