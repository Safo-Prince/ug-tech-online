import * as React from "react";
import { useState } from "react";
import Filter from "./Filter";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import { columns } from "../constants/constants";
import AprrovalModal from "./modals/ApprovalModal";
import { tableFilter } from "../constants/constants";

const AdminTable: React.FC = () => {
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="mx-auto w-full sm:max-w-7xl py-16 sm:py-20 lg:px-8 px-6   h-full relative">
      <AprrovalModal open={approvalOpen} setOpen={setApprovalOpen} />
      <div className="flex sm:flex-row flex-col justify-between  items-center">
        {/* @ts-ignore */}
        <Filter options={tableFilter} onSelectFilter={handleSelectFilter} />
        <Pagination />
      </div>
      <div className=" shadow ring-1 ring-black ring-opacity-5 overflow-x-scroll sm:rounded-lg mt-4 ">
        <table className="min-w-full divide-y divide-gray-300   border-b">
          <TableHeader columns={columns} />
          {/* @ts-ignore */}
          <TableBody selectedFilter={selectedFilter} />
        </table>
        <div className="absolute right-1/2 translate-x-1/2 ">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
