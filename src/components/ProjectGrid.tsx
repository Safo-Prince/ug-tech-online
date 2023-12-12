import React, { useEffect, useState } from "react";
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

const numCards = 6;
const items = Array.from({ length: numCards }, (_, index) => index);
const ProjectGrid = () => {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsloading(false), 3000);
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6  xl:gap-x-8 max-w-7xl mx-auto px-6 lg:px-8">
        {isLoading
          ? items.map((_, index) => <ProjectShimmer key={index} />)
          : projects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
      </div>
    </>
  );
};

export default ProjectGrid;
