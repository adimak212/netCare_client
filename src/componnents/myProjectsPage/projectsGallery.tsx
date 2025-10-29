import { useState, useEffect } from "react";
import axios from "axios";
import type { Project } from "../../types/types";
import Swal from "sweetalert2";
import ProjectImg from "../../assets/icons/project.png";

function projectGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [toDel, setToDel] = useState(false);
  const [selectedComponnent, setSelectedComponnent] = useState("");

  useEffect(() => {
    const res = axios
      .get<Project[]>("http://localhost:3000/getAllProjects")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data.sort((a, b) => a.name.localeCompare(b.name)));
      });
  }, []);

  const deleteProject = async (id: string, name: string) => {
    // בקשת אישור מהמשתמש
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Confirm deletion of ${name} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1173d4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#102235",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      //await axios.get("http://localhost:3000/deleteProject", { params: { id } });
      setProjects(projects.filter((a) => a.project_id != id));

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        background: "#102235",
        color: "#ffffff",
        confirmButtonColor: "#1173d4",
      });

      //setToDel(true);
      //setSelectedComponnent(id);
    }
  };

  return (
    <div className="w-11/12 h-[80%] flex justify-center items-center flex-wrap relative overflow-auto">
      {projects.map((proj) => (
        <div
          key={proj.project_id}
          className="m-5 bg-bgSex w-40 h-32 rounded-md cursor-pointer "
        >
          <button
            onClick={() => deleteProject(proj.project_id, proj.name)}
            className="ml-3 mt-2 bg-red-500 rounded-md w-[20px] h-[20px] text-sm"
          >
            x
          </button>
          <div className="flex justify-center items-center flex-col">
            <img className="h-10 w-10" src={ProjectImg} alt="proj" />
            <div className="font-bold text-white mt-3">{proj.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default projectGallery;
