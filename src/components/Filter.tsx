import * as React from "react";

interface Option {
  label: string;
}
interface FilterProps {
  onSelectFilter: (filter: string) => void;
  options?: Option[];
}

const Filter: React.FC<FilterProps> = ({ onSelectFilter, options }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectFilter(event.target.value);
  };

  return (
    <div className="flex justify-center items-center space-x-2 ">
      <h1 className="font-lato self-center font-normal text-sm ">
        Filter by{"  "}:
      </h1>
      <select
        id="filter"
        name="filter"
        className="mt-2 block self-center mb-2.5 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#324c6d] sm:text-sm sm:leading-6 max-w-[200px]"
        defaultValue="choose filter ..."
        onChange={handleFilterChange}
      >
        <option disabled>choose filter ...</option>

        {options?.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
