import * as React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}
{
  /* @ts-ignore */
}
const PendingModal: React.FC<Props> = ({ open, setOpen }) => {
  const [buttonText, setButtonText] = useState("Send");

  const handleSend = () => {
    setButtonText("Sending...");
  };
  return (
    <Transition.Root static show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-poppins">
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
              <Dialog.Panel className="relative transform  w-full rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6  max-h-[97vh] overflow-y-scroll">
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
                    <div className=" flex flex-col justify-center items-center sm:mt-10 mt-5">
                      <textarea
                        required
                        placeholder="Message"
                        rows={6}
                        name="message"
                        id="message"
                        // value={formData.description}
                        // onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#153D6D] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-around mt-5 space-x-5">
                  <button
                    onClick={() => setOpen(false)}
                    className="  rounded-md bg-[#153D6D] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#48627f]å focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="rounded-md bg-[#F46969] w-full py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#f19494]  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    {buttonText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PendingModal;
