import * as React from "react";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import { columns } from "../constants/constants";
import AprrovalModal from "./modals/ApprovalModal";
import PendingModal from "./modals/PendingModal";
import { tableFilter } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const AdminTable: React.FC = () => {
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const [pendingOpen, setPendingOpen] = useState(false);
  const [ProjectId, setProjectId] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("project-name");

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("auth_token");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("auth_token") === null) navigate("/login");
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (approvalOpen) {
        setApprovalOpen(false);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [approvalOpen]);

  return (
    <div className="mx-auto w-full sm:max-w-7xl py-16 sm:py-20 lg:px-8 px-6   h-full relative">
      <AprrovalModal open={approvalOpen} projectName={projectName} />
      {/* @ts-ignore */}
      <PendingModal open={pendingOpen} setOpen={setPendingOpen} ProjectId={ProjectId}
      />

      <div className="flex sm:flex-row flex-col justify-between  items-center">
        {/* @ts-ignore */}
        <Filter options={tableFilter} onSelectFilter={handleSelectFilter} />
        <Pagination />
      </div>
      <div className=" shadow ring-1 ring-black ring-opacity-5 overflow-x-scroll sm:rounded-lg mt-4 ">
        <table className="min-w-full divide-y divide-gray-300   border-b">
          <TableHeader columns={columns} />

          <TableBody
            selectedFilter={selectedFilter}
            setApprovalOpen={setApprovalOpen}
            setProjectName={setProjectName}
            setPendingOpen={setPendingOpen}
            setProjectId={setProjectId}
          />
        </table>
        <div className="absolute right-1/2 translate-x-1/2 ">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
