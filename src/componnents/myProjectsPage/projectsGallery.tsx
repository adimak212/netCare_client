import { useState, useEffect } from "react";
import axios from "axios";
import type { Project } from "../../types/types";
import Swal from "sweetalert2";
import projectIcon from "../../assets/icons/project.png"
import { useNavigate } from "react-router-dom";


function projectGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [toDel, setToDel] = useState(false);
  const [selectedComponnent, setSelectedComponnent] = useState("");
  const navigate = useNavigate();




  useEffect(() =>  {
    try {
      const res =  axios
      .get<Project[]>("http://localhost:3000/v1/projects/getAllProjects")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data.sort((a, b) => a.name.localeCompare(b.name)));
      });
    } catch (error) {
      console.log("Error" + error);
    }
    
  }, []);

  

  const deleteProject = async (id: string, name: string) => {

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
      await axios.get("http://localhost:3000/v1/projects/deleteProject", { params: { id } });
      setProjects(projects.filter((a) => a.project_id != id));

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
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
      {projects.map((proj) => (
        <div
          key={proj.project_id}
          className="m-5 bg-background w-40 h-32 rounded-md cursor-pointer z-[50]"
          onClick = {() => handlePick(proj.project_id)}
        >
          <button
            onClick={(e) =>{e.stopPropagation(); deleteProject(proj.project_id, proj.name)}}
            className="ml-3 mt-2 bg-red-500 rounded-md w-[20px] h-[20px] text-sm z-[100]"
          >
            x
          </button>
          <div className="flex justify-center items-center flex-col">
            <img className="h-10 w-10" src={projectIcon} alt="proj" />
            <div className="font-bold text-white mt-3">{proj.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default projectGallery;
