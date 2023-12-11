import React from "react";
import projectImage from "../assets/project-image.png";

const ProjectCard = () => {
  return (
    <div className="">
      <div className=" w-full sm:w-80 xl:w-96   border rounded-md p-3   shadow-sm space-y-2 hover:scale-105 transition-all cursor-pointer">
        <img src={projectImage} className="rounded-md object-cover " />
        <div>
          <h1 className="text-black text-sm">SOA-01</h1>
          <h2 className="text-[#56585B] text-xl font-bold">Quad-pedal Robot</h2>
        </div>
        <div>
          <p className="text-[#56585B] xl:text-lg">
            A molasses -based and fruit residue-based supplement formulated to
            supply the critical nutrients needed to provide optimal conditions
            to enhance utilization.
          </p>
          <button className="bg-[#153D6D] text-white lg:px-2 py-1 px-4  rounded-md text-sm mt-2">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
