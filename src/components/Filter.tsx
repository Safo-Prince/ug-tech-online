import * as React from "react";
import { useEffect, useState } from "react";
import { FileMinus } from "@phosphor-icons/react";

interface FilterProps {
  onSelectFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSelectFilter }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectFilter(event.target.value);
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <h1 className="font-lato self-center font-normal text-sm ">
        Filter by{"  "}:
      </h1>
      <select
        id="filter"
        name="filter"
        className="mt-2 block self-center mb-2.5 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="choose filter ..."
        onChange={handleFilterChange}
      >
        <option>choose filter ...</option>
        <option>Approved</option>
        <option>Not Approved</option>
      </select>
    </div>
  );
};

export default Filter;
