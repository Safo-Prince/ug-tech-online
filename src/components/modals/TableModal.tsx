import * as React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  setPendingOpen: (arg: boolean) => void;
  setApprovalOpen: (arg: boolean) => void;
  setProjectName: (arg: string) => void;
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

const TableModal: React.FC<Props> = ({
  open,
  setOpen,
  rowData,
  setApprovalOpen,
  setProjectName,
  setPendingOpen,
}) => {
  const [buttonText, setButtonText] = useState("Accept");
  const [modalData, setModalData] = useState<any | null>(null);
 {/* @ts-ignore */}
  const [openModal, setOpenModal] = useState(false);
  {/* @ts-ignore */}
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  {/* @ts-ignore */}
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        {/* @ts-ignore */}
        const response = await fetch(`https://innovate.ug.edu.gh/api/projects/${rowData.id}`
        );
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

  const handleApproval = async () => {
    setButtonText("Accepting...");
    try {
      // Call the API endpoint to update the approval status
      const response = await fetch(
        `https://innovate.ug.edu.gh/api/approve-project/${
          modalData && modalData.id
        }`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Project approved successfully");
        // Reload the page
        setOpen(false);
        setApprovalOpen(true);
        setProjectName(modalData.innovation_name);
        setButtonText("Accept");
      } else {
        console.error("Error approving project");
      }
    } catch (error) {
      console.error("Error approving project:", error);
    }
  };

  const handlePending = async () => {
    setOpen(false);
    setPendingOpen(true);
    try {
      // Call the API endpoint to update the approval status
      const response = await fetch(
        `https://innovate.ug.edu.gh/api/pend-project/${
          modalData && modalData.id
        }`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Project pended successfully");
      } else {
        console.error("Error approving project");
      }
    } catch (error) {
      console.error("Error approving project:", error);
    }
  };

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
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 max-h-[70vh] w-full  overflow-y-scroll">
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
                      <h1 className="font-bold  text-lg mt-4 text-left">
                        Description
                      </h1>
                      <p className="text-[#56585B] xl:text-lg text-left">
                        {modalData && modalData.description}
                      </p>
                    </div>
                    <div className="">
                      <h1 className="font-bold text-lg text-left">
                        Developers:
                      </h1>
                      <ul className="list-disc list-inside text-left">
                        {/* @ts-ignore */}
                        {modalData && modalData.developers && modalData.developers.split(",").map((developer, index) => (
                              <li
                                key={index}
                                className="text-[#56585B] xl:text-lg"
                              >
                                {developer.trim()}{" "}
                                {/* Trim to remove any leading/trailing whitespaces */}
                              </li>
                            ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h1 className="font-bold  text-lg text-left">
                        Development status
                      </h1>
                      <p className="text-[#56585B] xl:text-lg text-left ">
                        {modalData && modalData.status}
                      </p>
                    </div>
                    <div>
                      <h1 className="font-bold  text-lg text-left">Industry</h1>
                      <p className="text-[#56585B] xl:text-lg text-left">
                        {modalData && modalData.industry}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h1 className="font-bold  text-lg text-left">
                        Application and Market Utility
                      </h1>
                      <p className="text-[#56585B] xl:text-lg  text-left">
                        {modalData && modalData.applicationAndMarketUtility}
                      </p>
                    </div>

                    <div className="mt-2">
                      <h1 className="font-bold   text-lg text-left">
                        Key Benefits:
                      </h1>
                      <ul className="list-disc list-inside text-left">
                        {/* @ts-ignore */}
                        {modalData && modalData.keyBenefits && modalData.keyBenefits.split(",").map((keyBenefits, index) => (
                              <li
                                key={index}
                                className="text-[#56585B] xl:text-lg"
                              >
                                {keyBenefits.trim()}{" "}
                                {/* Trim to remove any leading/trailing whitespaces */}
                              </li>
                            ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <h1 className="font-bold text-lg text-left">
                        Relevant links:
                      </h1>
                      {modalData && modalData.links && (
                        <ul className="list-disc list-inside text-left">
                          {/* @ts-ignore */}
                          {modalData.links.split(",").map((link, index) => (
                            <li
                              key={index}
                              className="text-[#007AA0] xl:text-lg"
                            >
                              <a
                                href={
                                  link.trim().startsWith("https://")
                                    ? link.trim()
                                    : `https://${link.trim()}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {`Link ${index + 1}`}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      {!modalData ||
                        (!modalData.links && (
                          <p className="text-[#56585B] xl:text-lg">
                            No relevant links available.
                          </p>
                        ))}
                    </div>

                    <div>
                      <h1 className="font-bold text-lg">Images:</h1>
                      <div className="flex  justify-center items-center w-full space-y-4   flex-col ">
                        {/* @ts-ignore */}
                        {modalData && modalData.files && modalData.files.split(",").map((filePath, index) => (
                              <img
                                key={index}
                                src={`https://innovate.ug.edu.gh/${filePath.trim()}`}
                                className="w-full aspect-[16/9] rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                alt={`Image ${index + 1}`}
                              />
                            ))}
                      </div>
                      {!modalData ||
                        (!modalData.files && (
                          <p className="text-[#56585B] xl:text-lg">
                            No images available.
                          </p>
                        ))}
                    </div>

                    <div className="space-y-3 flex flex-col items-start"></div>
                    <div className="flex justify-around mt-5 space-x-5">
                      <button
                        onClick={handleApproval}
                        className="  rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {buttonText}
                      </button>
                      <button
                        onClick={handlePending}
                        className="rounded-md bg-[#F46969] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#f19494]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
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
