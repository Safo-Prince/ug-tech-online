import * as React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import fertilizer from "../../assets/fertilizer.png";
import imageTwo from "../../assets/image2.png";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: {
    modalData?: {
      id: number;
      // other properties...
    } | null;
    // ... other properties
  };
}




const TableModal: React.FC<Props> = ({ open, setOpen, rowData }) => {

  const [modalData, setModalData] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/projects/${rowData.id}`);
        const data = await response.json();
        setModalData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching modal data:", error);
        setIsLoading(false);
      }
    };

    if (rowData) {
      fetchModalData();
    }
  }, [rowData]);

  return (
    <Transition.Root static show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 max-h-[95vh] w-full  overflow-y-scroll">
                <div className="absolute right-0 top-0  pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex sm:items-start w-full ">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg  text-center leading-6 text-gray-900 mt-6 font-medium"
                    >
                      {modalData && modalData.innovation_name}
                    </Dialog.Title>
                    <div className="border border-stone-500 mt-3 mb-3 " />
                    <div>
                      <h1 className="font-bold  text-lg mt-4">Description</h1>
                      <p className="text-[#56585B] xl:text-lg ">
                      {modalData && modalData.description}
                      </p>
                    </div>
                    <div className="">
                      <h1 className="font-bold text-lg">Developers:</h1>
                      <ul className="list-disc list-inside">
                        {modalData &&
                          modalData.developers &&
                          modalData.developers.split(',').map((developer, index) => (
                            <li key={index} className="text-[#56585B] xl:text-lg">
                              {developer.trim()} {/* Trim to remove any leading/trailing whitespaces */}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h1 className="font-bold  text-lg">Development status</h1>
                      <p className="text-[#56585B] xl:text-lg ">
                        At the pre -commercial stage.
                      </p>
                    </div>
                    <div>
                      <h1 className="font-bold  text-lg">Industry</h1>
                      <p className="text-[#56585B] xl:text-lg ">{modalData && modalData.industry}</p>
                    </div>
                    <div className="mt-2">
                      <h1 className="font-bold  text-lg">Overview</h1>
                      <p className="text-[#56585B] xl:text-lg ">
                      {modalData && modalData.applicationAndMarketUtility}
                      
                      </p>
                    </div>
                    <div className="mt-2">
                      <h1 className="font-bold   text-lg">Key Benefits:</h1>
                      <ul className="list-inside list-disc ">
                        <li className="text-[#56585B] xl:text-lg">
                        {modalData && modalData.keyBenefits}
                        </li>
                       
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h1 className="font-bold  text-lg">Target Market:</h1>
                      <ul className="list-disc list-inside ">
                        <li className="text-[#56585B] xl:text-lg ">
                          Ruminant farmers in areas where molasses or fruit
                          wastes are readily available can take advantage of
                          this technology to improve their production.
                        </li>
                        <li className="text-[#56585B] xl:text-lg">
                          It is ideal for the large-scale production of
                          multi-nutrient supplements for sale to ruminant
                          farmers.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-2">
  <h1 className="font-bold text-lg">Relevant links:</h1>
  {modalData && modalData.links && (
    <ul className="list-disc list-inside">
      {modalData.links.split(',').map((link, index) => (
        <li key={index} className="text-[#007AA0] xl:text-lg">
          <a href={link.trim()} target="_blank" rel="noopener noreferrer">
            {`Link ${index + 1}`}
          </a>
        </li>
      ))}
    </ul>
  )}
  {!modalData || !modalData.links && (
    <p className="text-[#56585B] xl:text-lg">No relevant links available.</p>
  )}
</div>



                    <div>
                      <h1 className="font-bold  text-lg">Images:</h1>
                      <div className="flex space-x-2">
                        <img src={fertilizer} className="w-28 h rounded-lg" />
                        <img src={imageTwo} className="w-28 rounded-lg" />
                      </div>
                    </div>
                    <div className="space-y-3 flex flex-col items-start"></div>
                    <div className="flex justify-around mt-5 space-x-5">
                      <button className="  rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Accept
                      </button>
                      <button className="rounded-md bg-[#F46969] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#f19494]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Pending
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TableModal;
