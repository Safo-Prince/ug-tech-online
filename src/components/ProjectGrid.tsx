// ProjectGrid.jsx
import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectShimmer from "./shimmers/ProjectShimmer";

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/approved-projects");
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 xl:gap-x-8 max-w-7xl mx-auto px-6 lg:px-8">
          {[...Array(6)].map((_, index) => (
            <ProjectShimmer key={index} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 xl:gap-x-8 max-w-7xl mx-auto px-6 lg:px-8"
        >{/* @ts-ignore */}
          {projects.map((project) => ( <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ProjectGrid;
