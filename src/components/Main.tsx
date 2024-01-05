// Main.tsx
import * as React from "react";
import { useState } from "react";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ProjectGrid from "./ProjectGrid";
import { HomeFilter } from "../constants/constants";

interface Props {
  searchQuery: string;
}

const Main = ({ searchQuery }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="my-10">
      <div className="mx-auto max-w-7xl sm:flex-row flex-col items-center px-6 lg:px-8 flex justify-between w-full">
        <Filter options={HomeFilter} onSelectFilter={handleSelectFilter} />
        <Pagination />
      </div>
      <ProjectGrid selectedFilter={selectedFilter} searchQuery={searchQuery} />
    </div>
  );
};

export default Main;
