import Filter from "./Filter";
import Pagination from "./Pagination";
import * as React from "react";
import ProjectGrid from "./ProjectGrid";

const Main = () => {
  return (
    <div className=" my-10">
      <div className="  mx-auto max-w-7xl sm:flex-row flex-col items-center px-6 lg:px-8 flex  justify-between w-full">
        {/* @ts-ignore */}
        <Filter />
        <Pagination />
      </div>
      <ProjectGrid />
    </div>
  );
};

export default Main;
