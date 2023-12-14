import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import projectImage from "../assets/project-image.png";
import ProjectCard from "./ProjectCard";
import ProjectShimmer from "./shimmers/ProjectShimmer";

const projects = [
  {
    image: projectImage,
    project_id: "SOA 1",
    title: "Quad-pedal Robot",
    description:
      "A molasses -based and fruit residue-based supplement formulated to supply the critical nutrients needed to provide optimal conditions to enhance utilization. ",
  },
  {
    image: projectImage,
    project_id: "SOA 2",
    title: "Quad-pedal Robot",
    description:
      "A molasses -based and fruit residue-based supplement formulated to supply the critical nutrients needed to provide optimal conditions to enhance utilization. ",
  },
  {
    image: projectImage,
    project_id: "SOA 3",
    title: "Quad-pedal Robot",
    description:
      "A molasses -based and fruit residue-based supplement formulated to supply the critical nutrients needed to provide optimal conditions to enhance utilization. ",
  },
  {
    image: projectImage,
    project_id: "SOA 4",
    title: "Quad-pedal Robot",
    description:
      "A molasses -based and fruit residue-based supplement formulated to supply the critical nutrients needed to provide optimal conditions to enhance utilization. ",
  },
  {
    image: projectImage,
    project_id: "SOA 5",
    title: "Quad-pedal Robot",
    description:
      "A molasses -based and fruit residue-based supplement formulated to supply the critical nutrients needed to provide optimal conditions to enhance utilization. ",
  },
  {
    image: projectImage,
    project_id: "SOA 6",
    title: "Quad-pedal Robot",
    description:
      "A molasses -based and fruit residue-based supplement formulated to supply the critical nutrients needed to provide optimal conditions to enhance utilization. ",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const numCards = 6;
const items = Array.from({ length: numCards }, (_, index) => index);
const ProjectGrid = () => {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsloading(false), 3000);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6  xl:gap-x-8 max-w-7xl mx-auto px-6 lg:px-8">
          {items.map((_, index) => (
            <ProjectShimmer key={index} />
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6  xl:gap-x-8 max-w-7xl mx-auto px-6 lg:px-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ProjectGrid;
