import * as React from "react";
import { useEffect, useState } from "react";
import { Eye } from "iconsax-react";
{/* @ts-ignore */}
import { DotsThreeVertical } from "@phosphor-icons/react";

import TableModal from "./modals/TableModal";
import TableShimmer from "./shimmers/TableShimmer";

interface Props {
  selectedFilter: string;
}
const TableBody: React.FC<Props> = ({ selectedFilter }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  // const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://innovate.ug.edu.gh/api/projects?filter=${selectedFilter}`
        );
        const data = await response.json();

        const dataArray = Array.isArray(data) ? data : [data];
        const sortedData = dataArray.sort((a, b) => b.id - a.id);

        setTableData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedFilter]);

  // const handleSelectFilter = (filter: string) => {
  //   setSelectedFilter(filter);
  // };

  // Function to handle opening the modal
  const handleOpenModal = (rowData: any) => {
    setOpenModal(true);
    setSelectedRow(rowData);
  };

  console.log(selectedFilter);

  return (
    <>
      {/* <Filter onSelectFilter={handleSelectFilter} /> */}
      <TableModal
        setOpen={setOpenModal}
        open={openModal}
        rowData={selectedRow}
      />

      {isLoading ? (
        <TableShimmer />
      ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          {tableData.map((rowData) => (
            <tr key={rowData.project_id} className="px-10">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {`SOA 0${rowData.id}`}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.upload_date}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.innovation_name}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                {rowData.status}
              </td>
              <td className="py-4 pl-4 pr-3 sm:pl-6">
                <div className="flex items-center space-x-1">
                  <button onClick={() => handleOpenModal(rowData)}>
                    <Eye size="25" color="black" className="cursor-pointer" />
                  </button>
                  {/* <button>
                    <DotsThreeVertical size={25} />
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default TableBody;
