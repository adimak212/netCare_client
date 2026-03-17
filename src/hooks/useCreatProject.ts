import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CreatProjectParams, CreatProjectResponse } from "@/types/types";

export const useCreatProject = () =>
  useMutation({
    mutationFn: async ({ canvasComponents, ProjectName, connections , owner_id}: CreatProjectParams) => {
      const res = await axios.post<CreatProjectResponse>(
        "http://localhost:3000/v1/projects/createProject",
        {
          canvasComponents,
          ProjectName,
          connections,
          owner_id
        },
      );
      return res.data;
    },
  });
