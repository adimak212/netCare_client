import { useState, useEffect } from "react";
import axios from "axios";
import type { Project } from "@/types/types";
import Swal from "sweetalert2";
import projectIcon from "@/assets/icons/project.png";
import deleteIcon from "@/assets/icons/delete.png";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../Loading/LoadingOverlay";

function projectGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDel , setToDel] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get<Project[]>("http://localhost:3000/v1/projects/getAllProjects").then((response) => {
        console.log(response.data);
        setProjects(response.data.sort((a, b) => a.name.localeCompare(b.name)));
      });
    } catch (error) {
      console.log("Error" + error);
    }
  }, []);

  const deleteProject = async (id: string, name: string) => {
    setToDel(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Confirm deletion of ${name} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1173d4",
      confirmButtonText: "Yes, delete it!",
      background: "#102235",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      await axios.get("http://localhost:3000/v1/projects/deleteProject", { params: { id } });
      setProjects(projects.filter((a) => a.project_id != id));
      setIsLoading(false);
      Swal.fire({
        title: "Deleted!",
        text: "Your Project has been deleted",
        icon: "success",
        background: "#102235",
        color: "#ffffff",
        confirmButtonColor: "#1173d4",
      });
    }
  };
  const handlePick = async (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="w-11/12 h-[80%] flex justify-center items-center flex-wrap relative overflow-auto">
      {projects.length > 0 ? (
        projects.map((proj) => (
          <div
            key={proj.project_id}
            className="m-5 bg-background w-40 h-32 rounded-md cursor-pointer z-[50]"
            onClick={() => handlePick(proj.project_id)}
          >
            <img
              src={deleteIcon}
              alt="delete icon"
              className="w-[25px] h-fit m-1"
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(proj.project_id, proj.name);
              }}
            />
            <div className="flex justify-center items-center flex-col">
              <img className="h-10 w-10" src={projectIcon} alt="proj" />
              <div className="font-bold text-white mt-3">{proj.name}</div>
            </div>
            {proj.project_id == toDel && <LoadingOverlay loading={true} massege={`Deleting Project: ${proj.name}`}/>}
          </div>
        ))
      ) : (
        <>
          <div className="flex justify-center items-center flex-col">
            <div>You Don't Have Any Projects</div>
            <div className="opacity-50 text-sm">
              Start building your network topology by click button
            </div>
            <button
              className="bg-primary rounded-md w-1/2 h-10 mt-3 font-bold"
              onClick={() => navigate(`/`)}
            >
              New Project +
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default projectGallery;
