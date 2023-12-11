import Filter from "./Filter";
import Pagination from "./Pagination";
import React from "react";
import ProjectGrid from "./ProjectGrid";

const Main = () => {
  return (
    <div className=" mx-auto max-w-7xl  px-6 lg:px-8 my-10">
      <div className=" flex justify-between w-full">
        <Filter />
        <Pagination />
      </div>
      <ProjectGrid />
    </div>
  );
};

export default Main;
