import * as React from 'react';
import projectImage from "../assets/project-image.png";

interface Project {
  image: string;
  project_id: string;
  title: string;
  description: string;
}

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className=" w-full sm:w-80 xl:w-96   border rounded-md p-3   shadow-sm space-y-2 hover:scale-95 transition-all cursor-pointer">
      <img src={project.image} className="rounded-md object-cover " />
      <div>
        <h1 className="text-black text-sm">{project.project_id}</h1>
        <h2 className="text-[#56585B] text-xl font-bold">{project.title}</h2>
      </div>
      <div>
        <p className="text-[#56585B] xl:text-lg">{project.description}</p>
        <button className="bg-[#153D6D] text-white py-1 px-3  rounded-md text-sm mt-2">
          Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
