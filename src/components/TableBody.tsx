import { useEffect, useState } from "react";
import { Eye } from "iconsax-react";
import { Check, DotsThreeVertical } from "@phosphor-icons/react";

import TableModal from "./modals/TableModal";
import TableShimmer from "./shimmers/TableShimmer";

const TableBody: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <>
      <TableModal setOpen={setOpen} open={open} />

      {isLoading ? (
        <TableShimmer />
      ) : (
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className=" px-10 ">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
              SOA-01
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              23-11-2023
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              Quad-pedal Robot
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3   text-sm text-gray-500 sm:pl-6 ">
              At the pre-commercial stage.
            </td>
            <td className="py-4 pl-4  sm:pl-6   ">
              <div className="flex items-center space-x-1">
                <button onClick={() => setOpen(true)}>
                  <Eye size="25" color="black" className="cursor-pointer" />
                </button>
                <button className="px-1 py-1 rounded-full bg-[#33A70A]">
                  <Check weight="bold" size={12} color="white" />
                </button>
                <button>
                  <DotsThreeVertical weight="bold" size={25} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default TableBody;
