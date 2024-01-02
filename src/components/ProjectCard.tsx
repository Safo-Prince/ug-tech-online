// ProjectCard.jsx
import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  innovation_name: string;
  description: string;
  files: string; // Assuming files is a comma-separated string of image paths
  image_path: string | null; // New property to store the first image path
}

interface Props {
  project: Project;
}

const item = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
  },
};

const ProjectCard = ({ project }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/project-details/${project.id}`)}
      variants={item}
      className="w-full sm:w-80 xl:w-96 border rounded-md p-3 shadow-sm space-y-2 cursor-pointer"
    >
      {/* @ts-ignore */}

      {project.image_path ? (
        <img
          src={`https://innovate.ug.edu.gh/${project.image_path}`}
          className="rounded-md object-cover w-full"
          alt={project.title}
          style={{ width: "100%", height: "200px" }}
        />
      ) : (
        <div className="placeholder-image w-full h-[200px] bg-gray-100 flex items-center justify-center">
          No Image
        </div>
      )}
      <div>
        <h1 className="text-black text-sm">{`SOA 0${project.id}`}</h1>
        <h2 className="text-[#56585B] text-xl font-bold">
          {project.innovation_name}
        </h2>
      </div>
      <div>
        <p className="text-[#56585B] xl:text-lg line-clamp-3">
          {project.description}
        </p>
        <button className="bg-[#153D6D] text-white py-1 px-3 rounded-md text-sm mt-2">
          Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
