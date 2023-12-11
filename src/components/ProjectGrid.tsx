import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6  xl:gap-x-8 max-w-7xl mx-auto px-6 lg:px-8">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
};

export default ProjectGrid;
